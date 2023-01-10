function textShorter() {
    // [data-short] in html to cut text
    const largeText = document.querySelectorAll('[data-short]');
    largeText.forEach(element => {

        textShorter(element);
    });


    function textShorter(element, textLength) {
        textLength = element.getAttribute('data-short');
        if (textLength == '') {
            textLength = 50;
        }
        if (element.textContent.length > textLength) {
            element.textContent = element.textContent.slice(0, textLength) + '...';
        }
    }
}

module.exports = textShorter;