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




    //functions
    function addClass(element, className) {
        element.classList.add(className);
    }
    function removeClass(element, className) {
        element.classList.remove(className);
    }
});