// Функция для чтения значения куки по ее имени
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Получаем значения куков
const nameCookie = getCookie('name');
const idCookie = getCookie('id');
const authorizationCookie = getCookie('authorization');
// if (authorizationCookie !== 'true') {
//     window.location.href = 'https://duplex.zentas.ru/admin'; // Перенаправление на другую страницу
// }

// Устанавливаем значения куков в соответствующие элементы на странице
document.getElementById('name').innerText = `${nameCookie}`;
document.getElementById('h_name').innerText = `${nameCookie}!`;
// document.getElementById('id').innerText = `ID: ${idCookie}`;
// document.getElementById('authorization').innerText = `Authorized: ${authorizationCookie}`;


window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.remove(); // Удаление элемента через 3 секунды
        }
    }, 1500);

    const helloElement = document.getElementById('hello');
    const delayBeforeAnimation = 3000; // 10 секунд
    const delayBeforeRemoval = delayBeforeAnimation + 1000; // Добавляем еще 1 секунду для анимации перед удалением

    // Функция для анимации и удаления элемента
    function animateAndRemoveElement() {
        // Добавляем класс для анимации ухода вниз
        helloElement.classList.add('animate-down');

        // Удаляем элемент после завершения анимации
        setTimeout(() => {
            helloElement.remove();
        }, 1000); // По времени анимации (1 секунда)
    }

    // Устанавливаем задержку перед анимацией и удалением элемента
    setTimeout(animateAndRemoveElement, delayBeforeAnimation);
});
