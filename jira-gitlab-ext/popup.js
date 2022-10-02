let generateLink = document.getElementById("generateLinks");

// When the button is clicked, inject setPageBackgroundColor into current page
generateLink.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: createJiraLinks,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function createJiraLinks() {
  let svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';

  let branchName = '';
  let branchRow = document.querySelector('[data-test-id="issue.views.field.select.common.select-inline-edit.customfield_10104"]');
  let branchElt = branchRow.querySelector('div:nth-child(2) a');
  if (branchElt) {
    branchName = branchElt.innerText;

    let aSvg = document.createElement('a');
    aSvg.setAttribute("style", "position: absolute; top: 5px; left: 100px;");
    aSvg.innerHTML = svgHtml;
    // ToDo  Link has to be set in the options
    aSvg.setAttribute("href", "/compare/master..."+branchName);
    aSvg.setAttribute("target", "_blank");
    branchRow.setAttribute("style", "position: relative;");
    branchRow.append(aSvg);
  }
  
  let SlBranchName = '';
  let SlBranchRow = document.querySelector('[data-test-id="issue.views.field.single-line-text-inline-edit.customfield_11024"]');
  let SlBranchElt = SlBranchRow.querySelector('[data-test-id="issue.views.field.single-line-text-inline-edit.read-view.customfield_11024"]');
  if (SlBranchElt) {
    SlBranchName = SlBranchElt.innerText;

    let aSvg = document.createElement('a');
    aSvg.setAttribute("style", "position: absolute; top: 5px; left: 100px;");
    aSvg.innerHTML = svgHtml;
     // ToDo  Link has to be set in the options
    aSvg.setAttribute("href", "/compare/master..."+SlBranchName);
    aSvg.setAttribute("target", "_blank");
    SlBranchRow.setAttribute("style", "position: relative;");
    SlBranchRow.append(aSvg);
  }
}