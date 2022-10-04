
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
