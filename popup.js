let title;
const isOrderAvailable = (await chrome.storage.local.get(["isOrderAvailable"])).isOrderAvailable;

if (isOrderAvailable) {
    title = 'You can order groceries on this site!';
} else {
    title = 'This site does not support ordering groceries';
}

document.getElementsByClassName('title')[0].innerHTML = title;