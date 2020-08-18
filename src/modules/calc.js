'use strict';
import animate from './animate';

const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),// Получаю элементы со страницы
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');
    const inpNumber = document.querySelectorAll('.calc-item');

    const countSum = () => { //Рассчитываю значения в инпутах
        let total = 0,
            countValue = 1,
            dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
        }

        if (totalValue.textContent === '' + Math.floor(total)) {//Отменяю анимацию, если значение "ИТОГО" не изменилось
            totalValue.textContent = Math.floor(total);
        } else {
            animate({//Вызываю анимацию для значения 'ИТОГО"
                duration: 2500,
                timing(timeFraction) {
                    return Math.pow(timeFraction, 1 / 9);
                },
                draw(progress) {
                    if (isNaN(Math.floor(progress * total))) {
                        totalValue.textContent = '';
                    } else {
                        totalValue.textContent = Math.floor(progress * total);
                    }
                }
            });
        }

    };

    calcBlock.addEventListener('change', (event) => { //Навесил события на инпуты для моментального рассчета
        const target = event.target;

        if (calcSquare.value === '') {
            totalValue.textContent = 0;
        } else if (target.matches('select') || target.matches('input')) {
            countSum();
        }

    });

    inpNumber.forEach(el => { // Поменял аттрибуты у инпутов для валидации
        if (el.matches('INPUT')) {
            el.type = 'text';
            el.removeAttribute('min');
            el.removeAttribute('step');
        }
    });

    inpNumber.forEach(el => el.addEventListener('input', () => {//Валидирую инпуты
        el.value = el.value.replace(/[^\d\.]/g, '');
        if (el.value.match(/\./g) && el.value.match(/\./g).length > 1) {//Разрешает ввести только одну точку
            el.value = el.value.substr(0, el.value.lastIndexOf("."));
        }
    }));

};

export default calc;