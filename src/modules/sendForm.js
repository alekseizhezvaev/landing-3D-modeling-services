'use strict';
const sendForm = () => {
    const errorMessage = 'Что то пошло не так...', //Сообщения для вывода статуса отправки
        loadMessage = document.querySelector('.cssload-thecube'),
        succesMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const form = document.querySelectorAll('form');// Получаю элементы со страницы
    const inputs = document.querySelectorAll('input');

    const statusMessage = document.createElement('div');
    const cloneLoadMessage = loadMessage.cloneNode(true);//Клонирую анимацию для загрузки сообщения
    cloneLoadMessage.style.display = 'block';
    statusMessage.style.cssText = 'font-size: 2rem;';
    statusMessage.style.cssText = 'color: white;';

    const postData = (formData) => { //Возвращает запрос на сервер
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData
        });
    };

    form.forEach(elem => { //На каждый элемент навешиваю событие сабмит
        elem.addEventListener('submit', (event) => {
            event.preventDefault();
            statusMessage.textContent = '';
            elem.appendChild(statusMessage);
            statusMessage.appendChild(cloneLoadMessage);
            const formData = new FormData(elem);

            postData(formData)// Вызываю запрос на сервер, который принимает данные с formData
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    statusMessage.textContent = succesMessage;
                    setTimeout(() => {
                        statusMessage.textContent = '';
                    }, 5000);
                    inputs.forEach((elem) => elem.value = '');
                })
                .catch((error) => {//Функция для вывода ошибки
                    statusMessage.appendChild(cloneLoadMessage);
                    setTimeout(() => {
                        statusMessage.textContent = errorMessage;
                        setTimeout(() => {
                            statusMessage.textContent = '';
                        }, 5000);
                    }, 2000);
                    console.error(error);
                });
        });
    });
};
export default sendForm;