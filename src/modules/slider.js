'use strict';
const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),//Получаю элементы со страницы
        ulDot = document.querySelector('.portfolio-dots'),
        slider = document.querySelector('.portfolio-content');

    for (let i = 0; i < slide.length; i++) {//Добавляю точки 'dot' в зависимости от того, сколько элементов slide
        let dot = document.createElement('li');
        dot.classList.add('dot');
        ulDot.appendChild(dot);
    }

    const dot = document.querySelectorAll('.dot');//Получаю элементы и добавляю класс
    dot[0].classList.add('dot-active');

    let currentSlide = 0,
        interval;

    const nextSlide = (elem, index, classStr) => {//Добавляю класс active
        elem[index].classList.add(classStr);
    };

    const prevSlide = (elem, index, classStr) => {//Убираю класс active 
        elem[index].classList.remove(classStr);
    };

    const autoPlaySlide = () => {//Меняю класс active у слайдов (у предыдущего удаляется, следующему добавляется)

        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');
        currentSlide++;
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');

    };

    const startSlide = (time = 3000) => {//Меняю слайд с интервалом времени (по умолчанию 3 сек)
        interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => { //Останавливаю интервал
        clearInterval(interval);
    };

    startSlide(1500);//Вызываю автоматическую смену слайдов с интервалом в 1,5 сек

    slider.addEventListener('click', (event) => {//Навешиваю событие на стрелки и точки для смены слайдов
        event.preventDefault();

        let target = event.target;

        if (!target.matches('.portfolio-btn, .dot')) {
            return;
        }

        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');

        if (target.matches('#arrow-right')) { //Условия определения стрелки и точки
            currentSlide++;
        } else if (target.matches('#arrow-left')) {
            currentSlide--;
        } else if (target.matches('.dot')) {
            dot.forEach((elem, index) => {
                if (elem === target) {
                    currentSlide = index;
                }
            });
        }

        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }

        if (currentSlide < 0) {
            currentSlide = slide.length - 1;
        }

        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {//Останавливаю интервал смены слайдов при наведении мыши на стрелку или точку
        if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
            stopSlide();
        }
    });

    slider.addEventListener('mouseout', (event) => {//Продолжаю интервал смены слайдов при наведении мыши на стрелку или точку
        if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
            startSlide();
        }
    });


};

export default slider;