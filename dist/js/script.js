'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
        body = document.querySelector('body'),
        burger = document.querySelector('.burger'),
        burgerMenuList = document.querySelector('.menu__list');

    body.addEventListener('click', (e) => {
        if (menu.classList.contains('menu--active')) {
            if (e.target != burgerMenuList) {
                removeClass(menu, 'menu--active');
                removeClass(body, 'overflow');
            }
        } else if (!menu.classList.contains('menu--active')) {
            if (e.target == burger || e.target.offsetParent == burger) {
                addClass(menu, 'menu--active');
                addClass(body, 'overflow');
            }
        }
    });



    const progresBarValue = document.querySelectorAll('.progress-bar__percentage'),
        progressBarFiller = document.querySelectorAll('.progress-bar__filler');
    progresBarValue.forEach((percentage, index) => {
        progressBarFiller[index].style.width = percentage.textContent;
    });
    // [data-short] in html to cut text
    const largeText = document.querySelectorAll('[data-short]');
    largeText.forEach(element => {

        textShorter(element);
    });

    //functions
    function addClass(element, className) {
        element.classList.add(className);
    }
    function removeClass(element, className) {
        element.classList.remove(className);
    }

    function textShorter(element, textLenght) {
        textLenght = element.getAttribute('data-short');
        if (textLenght == '') {
            textLenght = 50;
        }
        if (element.textContent.length > textLenght) {
            element.textContent = element.textContent.slice(0, textLenght) + '...';
        }
    }

    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');

            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };
});