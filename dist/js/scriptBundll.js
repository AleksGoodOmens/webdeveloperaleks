'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const burger = require('./modules/burger'),
        form = require('./modules/form'),
        progressBar = require('./modules/progressBar'),
        scrollAnimation = require('./modules/scrollAnimation'),
        smoothLinks = require('./modules/smothLinks'),
        textShorter = require('./modules/textShorter');

    burger();
    form();
    progressBar();
    scrollAnimation();
    smoothLinks();
    textShorter();

});