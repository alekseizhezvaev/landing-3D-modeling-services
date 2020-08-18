
'use strict';
import animate from './animate';

const togglePopup = () => {
    const popup = document.querySelector('.popup'),//Получаю элементы со страницы
        popupContent = document.querySelector('.popup-content'),
        popupBtn = document.querySelectorAll('.popup-btn');

    popupBtn.forEach((elem) => {//На каждый элемент навешиваю событие click для показа popup
        elem.addEventListener('click', () => {
            popup.style.display = 'block';
            animate({//Анимация для показа popup
                duration: 500,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    popupContent.style.left = (progress * 42) + '%';//Расчет для позиции элемента popup
                }
            });
        });
    });


    popup.addEventListener('click', (event) => {//Событие, которое скрывает popup
        let target = event.target;
        if (target.classList.contains('popup-close')) {//Проверяет на кнопку закрытия popup
            popup.style.display = 'none';
        } else {
            target = target.closest('.popup-content');
            if (!target) {//Проверяет, клик по popup
                popup.style.display = 'none';
            }
        }
    });
};

export default togglePopup;