// Open the options tab to force the user to fill in the information
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({ url: "options.html" });
});

// Listener to close the options tab after submit
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg === "tab_close_msg") {
      chrome.tabs.query({
          currentWindow: true,
          active: true
      }, function (tabs) {
          chrome.tabs.remove(tabs[0].id);
      });
  }
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      debugger
      if (tab.url != "" && tab.url.includes('.atlassian.net/browse/')){
        chrome.tabs.executeScript(tab.id, {file: 'content-script.js'}, ([results]) => {
          console.log(results);
        });
      }
  });
  }
})
