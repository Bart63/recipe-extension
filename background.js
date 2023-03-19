function checkURL(tab) {
    if (tab.url && tab.url.includes('localhost')) {
        chrome.storage.local.set({ 'isOrderAvailable': true, 'currentTabId': tab.id })
        chrome.action.setIcon({ path: "images/icon-16.png", tabId: tab.id });
    } else {
        chrome.storage.local.set({ 'isOrderAvailable': false })
        chrome.action.setIcon({ path: "images/icon-disabled-16.png", tabId: tab.id });
    }
}


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        checkURL(tab);
    }
});


chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        checkURL(tab);
    });
});


chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    let ingredients = (await chrome.storage.local.get(["ingredients"])).ingredients;
    if (sender.tab && sender.tab.id === -1 && message.type === 'sendPostRequest') {
        fetch('http://localhost/order', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(ingredients)
        })
        .then(() => {
            console.log('POST request sent successfully');
            sendResponse({ success: true });
        })
        .catch(error => {
            console.log("ERRO")
            console.error(error);
            sendResponse({ success: false });
        });
    }
    return true;
  });