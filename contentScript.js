(() => {

chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type } = obj;

    if (type !== "RECIPE_PAGE") {
        return;
    }
    const ingredientDiv = document.getElementsByClassName('ingredients');
    if (ingredientDiv) {
        let el = ingredientDiv
        console.log(el.length)
        console.log(el)
    }
});

})();