(() => {

chrome.runtime.onMessage.addListener((obj, sender) => {
    const { type } = obj;

    if (type !== "RECIPE_PAGE") {
        return;
    }
    let ingredientDiv = document.getElementsByClassName('ingredients')[0];
    if (ingredientDiv) {
        let ingredientsList = [...ingredientDiv.querySelectorAll('li')]
        ingredientsList = ingredientsList.map((x => x.innerHTML))
        chrome.storage.local.set({ 'ingredients': ingredientsList })
    } else {
        chrome.storage.local.set({ 'ingredients': [] })
    }
});

})();