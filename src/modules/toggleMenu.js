'use strict';
import animate from './animate';

const toggleMenu = () => {
    const ua = navigator.userAgent;//Переменная для определения браузера
    const menu = document.querySelector('menu');//Получаю элемент со страницы

    const requestAnimateTargetMenu = (target) => {//Анимация для браузеров, которые не поддерживают scrollIntoView

        if (!target.getAttribute('href')) {
            target = target.parentNode;
        }

        const blockId = target.getAttribute('href');
        const scroll = document.querySelector('' + blockId).offsetTop;//Значение скролла от начала страницы до атрибута target

        menu.style.transform = `translate(-100%)`;

        animate({//Анимация для скролла страницы до scroll
            duration: 800,
            timing(timeFraction) {
                return timeFraction;
            },
            draw(progress) {
                menu.style.transform = window.scrollTo(0, progress * scroll);
            }
        });
    };

    const animateTargetMenu = (target) => {// Анимация для плавного скролла

        if (!target.getAttribute('href')) {
            target = target.parentNode;
        }

        const blockId = target.getAttribute('href');

        document.querySelector('' + blockId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        menu.style.transform = `translate(-100%)`;

    };

    const handlerMenu = () => {//Показываю menu ( меняю translate у элемента menu)
        const widthMain = menu.parentNode.scrollWidth;//Переменная для определения ширины страницы

        if (widthMain < 768) {//Отключаю анимацию 
            if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {//Показываю menu
                menu.style.transform = `translate(0)`;
            } else {//Скрываю menu
                menu.style.transform = `translate(-100%)`;
            }
        } else {
            if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {//Вызываю функцию если menu отсутствует на странице
                animate({ //Анимация для показа menu
                    duration: 800,
                    timing(timeFraction) {
                        return timeFraction;
                    },
                    draw(progress) {
                        menu.style.transform = `translate(${progress * 100}%)`;
                    }
                });
            } else {//Закрывает menu
                menu.style.transform = `translate(-100%)`;
            }
        }
    };

    document.querySelector('body').addEventListener('click', (event) => { //Навешиваю событие не body
        let target = event.target;

        if (target.closest('.menu')) {//Вызывает функцию если у родителя присутствует атрибут .menu
            handlerMenu();
        } else if (target.parentNode.getAttribute('href') === '#service-block') {//Условие для кнопки с переключение на "Наши услуги"
            event.preventDefault();
            if (ua.search(/InfoPath\.3/) > 0 || ua.search(/Edge/) > 0) {//Проверка браузера
                requestAnimateTargetMenu(target);//Анимация для браузеров, которые не поддерживают scrollIntoView
            } else {
                animateTargetMenu(target);
            }
        } else if (target.classList.contains('close-btn') || !target.closest('MENU')) {//Проверка для закрытия меню
            menu.style.transform = `translate(-100%)`;
        } else if (target.closest('MENU') && target.getAttribute('href')) {//Проверка для плавного скролла до атрибута href у target
            event.preventDefault();
            if (ua.search(/InfoPath\.3/) > 0 || ua.search(/Edge/) > 0) {//Проверка браузера
                requestAnimateTargetMenu(target);//Анимация для браузеров, которые не поддерживают scrollIntoView
            } else {
                animateTargetMenu(target);
            }

        }
    });

};

export default toggleMenu;