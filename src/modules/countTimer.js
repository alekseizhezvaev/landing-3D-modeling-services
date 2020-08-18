'use strict';
const countTimer = () => {
    const timerHours = document.getElementById('timer-hours'),//Получаю элементы со страницы
        timerMinutes = document.getElementById('timer-minutes'),
        timerSeconds = document.getElementById('timer-seconds'),
        nextDay = new Date();//Переменная, для следующего дня 
    let countTimer = 0;//Переменная для моментального запуска функции таймера
    nextDay.setHours(24, 0, 0);

    function getTimeRemaining(deadline) {//Возвращаю время в часах, минутах, секундах
        let dateNow = new Date().getTime(),
            dateStop = new Date(deadline).getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = '' + Math.floor(timeRemaining % 60),
            minutes = '' + Math.floor((timeRemaining / 60) % 60),
            hours = '' + Math.floor(timeRemaining / 3600);

        if (seconds.length < 2) {
            seconds = 0 + seconds;
        }

        if (minutes.length < 2) {
            minutes = 0 + minutes;
        }

        if (hours.length < 2) {
            hours = 0 + hours;
        }

        return {
            timeRemaining,
            hours,
            minutes,
            seconds
        };
    }

    let timerDeadLine = setInterval(function () {//Вывожу на страницу таймер
        countTimer += 1000;
        let timer = getTimeRemaining(nextDay.toDateString());

        if (Math.round(timer.timeRemaining) === 0) {//вызывает функцию если прошли сутки
            countTimer();
        }

        if (timer.timeRemaining < 0) {
            clearInterval(timerDeadLine);
        }

        timerHours.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;

    }, countTimer);

};

export default countTimer;