function progressBar() {
    const progressBarValue = document.querySelectorAll('.progress-bar__percentage'),
        progressBarFiller = document.querySelectorAll('.progress-bar__filler');

    progressBarValue.forEach((percentage, index) => {
        progressBarFiller[index].style.width = percentage.textContent;
    });
}


module.exports = progressBar;