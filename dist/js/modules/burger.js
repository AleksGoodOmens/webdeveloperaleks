'use strict';
function burger() {
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



    // window.addEventListener('touchend', (e) => {
    //     console.log('next is touch end');
    //     console.log(e.changedTouches[0].screenX);
    // })





    //functions
    function addClass(element, className) {
        element.classList.add(className);
    }
    function removeClass(element, className) {
        element.classList.remove(className);
    }


    // function getTouchStartPos() {
    //     window.addEventListener('touchstart', (e) => {
    //         const touchStartX = e.changedTouches[0].screenX;
    //         return touchStartX;
    //     });
    // }

    // function getTouchEndPos() {
    //     window.addEventListener('touchend', (e) => {
    //         const touchEndX = e.changedTouches[0].screenX;
    //         return touchEndX;
    //     });
    // }
}

module.exports = burger;