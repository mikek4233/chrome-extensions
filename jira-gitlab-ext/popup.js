let generateLink = document.getElementById("generateLinks");

// Event listent on click button
generateLink.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: createJiraLinks,
  });
});



function createJiraLinks() {
  let svgGitHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
  let svgCopyHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>';

  chrome.storage.sync.get("repos", (data) => {
    let dev = data.repos.dev;
    let sl  = data.repos.sl; 
    let branchName = '';
    let branchRow = document.querySelector('[data-test-id="issue.views.field.select.common.select-inline-edit.customfield_10104"]');
    let branchElt = branchRow.querySelector('div:nth-child(2) a');
    let branchWidget = document.getElementById("jira-gitlab-field-10104");

    if (branchElt && dev && !branchWidget) {
      branchName = branchElt.innerText;

      // Create container
      let svgContainer = document.createElement('span');
      svgContainer.setAttribute("id", "jira-gitlab-field-10104");
      svgContainer.setAttribute("style", "position: absolute; top: 5px; left: 100px;");

      // Create link to Gitlab
      let aSvgGit = document.createElement('a');
      aSvgGit.innerHTML = svgGitHtml;
      aSvgGit.setAttribute("href", dev + "/-/compare/master..." + branchName);
      aSvgGit.setAttribute("target", "_blank");
      svgContainer.append(aSvgGit);

      // Create copy branch name
      let spanSvgCopy = document.createElement('span');
      spanSvgCopy.setAttribute("style", "cursor: pointer;");
      spanSvgCopy.innerHTML = svgCopyHtml;
      spanSvgCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(branchName);
      });
      svgContainer.append(spanSvgCopy);

      // Add svg to row
      branchRow.setAttribute("style", "position: relative;");
      branchRow.append(svgContainer);
    }
    
    let SlBranchName = '';
    let SlBranchRow = document.querySelector('[data-test-id="issue.views.field.single-line-text-inline-edit.customfield_11024"]');
    let SlBranchElt = SlBranchRow.querySelector('[data-test-id="issue.views.field.single-line-text-inline-edit.read-view.customfield_11024"]');
    let SlBranchWidget = document.getElementById("jira-gitlab-field-11024");

    if (SlBranchElt && sl && !SlBranchWidget) {
      SlBranchName = SlBranchElt.innerText;


      // Create container
      let svgContainer = document.createElement('span');
      svgContainer.setAttribute("id", "jira-gitlab-field-11024");
      svgContainer.setAttribute("style", "position: absolute; top: 5px; left: 100px;");

      // Create link to Gitlab
      let aSvgGit = document.createElement('a');
      aSvgGit.innerHTML = svgGitHtml;
      aSvgGit.setAttribute("href", sl + "/compare/master..." + SlBranchName);
      aSvgGit.setAttribute("target", "_blank");
      svgContainer.append(aSvgGit);

      // Create copy branch name
      let spanSvgCopy = document.createElement('span');
      spanSvgCopy.setAttribute("style", "cursor: pointer;");
      spanSvgCopy.innerHTML = svgCopyHtml;
      spanSvgCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(SlBranchName);
      });
      svgContainer.append(spanSvgCopy);

      // Add svg to row
      SlBranchRow.setAttribute("style", "position: relative;");
      SlBranchRow.append(svgContainer);
    }
  });
}