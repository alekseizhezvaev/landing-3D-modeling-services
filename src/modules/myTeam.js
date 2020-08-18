'use strict';
const myTeam = () => {
    const imgMyTeam = document.querySelectorAll('.command__photo');//Получаю элементы со страницы
    let srcImg;

    imgMyTeam.forEach(el => el.addEventListener('mouseenter', (e) => {//Меняю фотографию при наведении мыши на картинку
        srcImg = event.target.src;
        event.target.src = event.target.dataset.img;
    }));

    imgMyTeam.forEach(el => el.addEventListener('mouseout', (e) => {//Меняю фотографию если убрал наведение мыши с картинки
        event.target.src = srcImg;
    }));

};

export default myTeam;