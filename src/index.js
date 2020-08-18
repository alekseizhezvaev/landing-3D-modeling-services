'use strict';

import 'nodelist-foreach-polyfill';
import "@babel/polyfill";
import elementClosest from 'element-closest';
import "formdata-polyfill";
import "es6-promise";
import "fetch-polyfill";

elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import myTeam from './modules/myTeam';
import sendForm from './modules/sendForm';
import valid from './modules/valid';



document.addEventListener('DOMContentLoaded', () => {
    //Таймер
    countTimer();

    //Модальное окно
    toggleMenu();

    //popup
    togglePopup();

    //табы
    tabs();

    //слайдер
    slider();

    //калькулятор
    calc();

    //наша команда
    myTeam();

    //send-ajax-form
    sendForm();

    //валидация
    valid();

});

