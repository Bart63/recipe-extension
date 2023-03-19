const name_quantity = (ing) => {
    const firstNumber = ing.match(/[0-9]+/);
    console.log(ing)
    if (firstNumber == null) {
        return ing.substring(0, ing.lastIndexOf(' '))
    }
    return [
        ing.substring(0, firstNumber.index-1),
        ing.substring(firstNumber.index) 
    ]
}

document.addEventListener('DOMContentLoaded', async function () {
    let title;
    const isOrderAvailable = (await chrome.storage.local.get(["isOrderAvailable"])).isOrderAvailable;

    if (isOrderAvailable) {
        title = 'You can order groceries on this site!';
        const currentTabId = (await chrome.storage.local.get(["currentTabId"])).currentTabId;

        await chrome.tabs.sendMessage(currentTabId, {
            type: "RECIPE_PAGE",
        });
        let ingredients = (await chrome.storage.local.get(["ingredients"])).ingredients;
        
        if (ingredients.length == 0) {
            title = 'No recipe here!';
        } else {
            ingredients = ingredients.map((x => [name_quantity(x)]))
            let ingTable = document.getElementsByClassName('ingredients')[0]
            ingTable.removeAttribute('hidden')
            ingredients.forEach((ing) => {
                ing = ing[0]
                let ingName = ing
                let ingQuantity = ''
                console.log(typeof ing)
                if (typeof ing == 'object') {
                    ingName = ing[0]
                    ingQuantity = ing[1]
                }
                ingTable.innerHTML += `<tr><td>${ingName}</td><td>${ingQuantity}</td></tr>`
            })
            document.getElementsByClassName('submit')[0].innerHTML = '<button>Add to basket</button>'
        }
    } else {
        title = 'This site does not support ordering groceries';
    }

    document.getElementsByClassName('title')[0].innerHTML = title;
});