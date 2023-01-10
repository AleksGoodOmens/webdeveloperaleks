/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/js/modules/burger.js":
/*!***********************************!*\
  !*** ./dist/js/modules/burger.js ***!
  \***********************************/
/***/ ((module) => {

"use strict";

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

/***/ }),

/***/ "./dist/js/modules/form.js":
/*!*********************************!*\
  !*** ./dist/js/modules/form.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

//! forms
function forms() {
    const textShorter = __webpack_require__(/*! ./textShorter */ "./dist/js/modules/textShorter.js");

    const file = document.querySelector('input[type="file"]');
    const remover = document.createElement('div');
    const label = file.nextElementSibling;

    function inputFile() {

        file.addEventListener('change', (e) => {

            if (file.files.length != 0) {
                if (file.files.length == 1) {
                    let indexOfName = 1;
                    for (let i in file.value) {
                        if (file.value[i] == '\\') {
                            indexOfName = i;
                        }
                    }
                    indexOfName++;
                    label.lastChild.textContent = file.value.slice(indexOfName);
                    textShorter(label.lastChild);

                } else if (file.files.length > 1 && file.files.length < 5) {
                    label.lastChild.textContent = `${file.files.length} - файла выбрано`;

                } else {
                    label.lastChild.textContent = `${file.files.length} - файлов выбрано`;
                }
                remover.className = 'remover';
                remover.innerHTML = '<div>X</div>';
                label.parentElement.append(remover);
                remover.addEventListener('click', () => {
                    file.value = '';
                    label.lastChild.textContent = 'Добавить файлы';
                    remover.remove();
                });
            }
            if (file.files.length == 0) {
                remover.className = 'remover';
                remover.innerHTML = '<div>X</div>';
                label.parentElement.append(remover);
                remover.addEventListener('click', () => {
                    file.value = '';
                    label.textContent = 'Добавить файлы';
                    remover.remove();
                });
            }
        });
    }
    inputFile();

    function resetFileInput() {
        file.value = '';
        label.lastChild.textContent = 'Добавить файлы';
        remover.remove();
    }


    const validate = new window.JustValidate('#form', {
        errorLabelStyle: {
        }
    });
    validate
        .addField('#name', [
            {
                rule: 'minLength',
                value: 3,
            },
            {
                rule: 'maxLength',
                value: 30,
            },
        ])
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Укажите Email',
            },
            {
                rule: 'email',
                errorMessage: 'Возможно вы допустили ошибку!',
            },
        ])
        .addField('#message', [
            {
                rule: 'required',
                errorMessage: 'Пожалуйста напишите хотя бы пару слов!',
            },
            {
                rule: 'minLength',
                value: 5,
                errorMessage: 'Сообщение должно быть более 5 символов',
            },
        ])
        .addField('#policy', [
            {
                rule: 'required',
                errorMessage: 'Обязательно поставьте галочку, после ознакомления с политикой конфиденциальности',
            }
        ]).onSuccess((event) => {
            let data = new FormData(event.target);
            let xhr = new XMLHttpRequest();
            const submBtn = event.target.querySelector('#submit-btn');
            submBtn.textContent = 'Отправляется...';
            submBtn.style.background = 'green';
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log('Validation passes and form submitted');
                        submBtn.textContent = 'Спасибо!';
                        submBtn.style.background = 'green';
                        remover.remove();

                    }
                }
            };

            xhr.open('POST', 'phpMailer.php', true);
            xhr.send(data);
            resetFileInput();
            event.target.reset();
        });
}

module.exports = forms;

/***/ }),

/***/ "./dist/js/modules/progressBar.js":
/*!****************************************!*\
  !*** ./dist/js/modules/progressBar.js ***!
  \****************************************/
/***/ ((module) => {

function progressBar() {
    const progressBarValue = document.querySelectorAll('.progress-bar__percentage'),
        progressBarFiller = document.querySelectorAll('.progress-bar__filler');

    progressBarValue.forEach((percentage, index) => {
        progressBarFiller[index].style.width = percentage.textContent;
    });
}


module.exports = progressBar;

/***/ }),

/***/ "./dist/js/modules/scrollAnimation.js":
/*!********************************************!*\
  !*** ./dist/js/modules/scrollAnimation.js ***!
  \********************************************/
/***/ ((module) => {

function scrollAnimation() {
    //! scroll Animations
    AOS.init(
        { // Global settings:
            disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
            startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
            initClassName: 'aos-init', // class applied after initialization
            animatedClassName: 'aos-animate', // class applied on animation
            useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
            disableMutationObserver: false, // disables automatic mutations' detections (advanced)
            debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
            throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


            // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
            offset: 120, // offset (in px) from the original trigger point
            delay: 0, // values from 0 to 3000, with step 50ms
            duration: 400, // values from 0 to 3000, with step 50ms
            easing: 'ease', // default easing for AOS animations
            once: true, // whether animation should happen only once - while scrolling down
            mirror: false, // whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation;
        }
    );
}

module.exports = scrollAnimation;

/***/ }),

/***/ "./dist/js/modules/smothLinks.js":
/*!***************************************!*\
  !*** ./dist/js/modules/smothLinks.js ***!
  \***************************************/
/***/ ((module) => {

function smoothLinks() {
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', (e) => {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');

            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}
module.exports = smoothLinks;

/***/ }),

/***/ "./dist/js/modules/textShorter.js":
/*!****************************************!*\
  !*** ./dist/js/modules/textShorter.js ***!
  \****************************************/
/***/ ((module) => {

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************************!*\
  !*** ./dist/js/scriptBundll.js ***!
  \*********************************/


document.addEventListener('DOMContentLoaded', () => {
    const burger = __webpack_require__(/*! ./modules/burger */ "./dist/js/modules/burger.js"),
        form = __webpack_require__(/*! ./modules/form */ "./dist/js/modules/form.js"),
        progressBar = __webpack_require__(/*! ./modules/progressBar */ "./dist/js/modules/progressBar.js"),
        scrollAnimation = __webpack_require__(/*! ./modules/scrollAnimation */ "./dist/js/modules/scrollAnimation.js"),
        smoothLinks = __webpack_require__(/*! ./modules/smothLinks */ "./dist/js/modules/smothLinks.js"),
        textShorter = __webpack_require__(/*! ./modules/textShorter */ "./dist/js/modules/textShorter.js");

    burger();
    form();
    progressBar();
    scrollAnimation();
    smoothLinks();
    textShorter();

});
})();

/******/ })()
;
//# sourceMappingURL=bundll.js.map