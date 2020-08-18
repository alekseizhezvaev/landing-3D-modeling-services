'use strict';
const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),//Получаю элементы со страницы
        tab = tabHeader.querySelectorAll('.service-header-tab'),
        tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {//Меняю класс active на текущем табе
        for (let i = 0; i < tabContent.length; i++) {
            if (index === i) {
                tab[i].classList.add('active');
                tabContent[i].classList.remove('d-none');
            } else {
                tab[i].classList.remove('active');
                tabContent[i].classList.add('d-none');
            }
        }
    };

    tabHeader.addEventListener('click', (event) => {//При клике вызываю функцию для смены таба
        let target = event.target;
        target = target.closest('.service-header-tab');

        if (target) {//Условие, на какой таб навесить событие click
            tab.forEach((item, i) => {
                if (item === target) {
                    toggleTabContent(i);
                }
            });
        }
    });
};

export default tabs;