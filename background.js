console.log("Background is working");

chrome.tabs.onUpdated.addListener((tabId, tab) => {
  console.log("New site: ", tab.url);    
});
  