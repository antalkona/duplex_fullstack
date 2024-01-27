fetch('../config_admin.json')
    .then(response => response.json())
    .then(data => {
        if (data.open === true) {
            console.log('Сайт открыт');
        } else {
            window.location.href = 'https://zentas.ru/closed';
        }
    })
    .catch(error => {
        console.error('Ошибка чтения файла:', error);
    });
fetch('/data', {
    method: "post",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})
    .then(response => response.json())
    .then(data => {
        updateCarousel(data);
    })
    .catch(error => console.error(error));

document.addEventListener("DOMContentLoaded", function() {
    const platform = navigator.platform
    const language = navigator.language
    const appVersion = navigator.appVersion;
    
});

function updateCarousel(data) {
    // Обновление карточки 1
    document.getElementById('cc1_title').textContent = data.card1.title;
    document.getElementById('cc1_img').src = data.card1.image;

    // Обновление карточки 2
    document.getElementById('cc2_title').textContent = data.card2.title;
    document.getElementById('cc2_img').src = data.card2.image;

    // Обновление карточки 3
    document.getElementById('cc3_title').textContent = data.card3.title;
    document.getElementById('cc3_img').src = data.card3.image;
}

document.addEventListener('DOMContentLoaded', function() {
    const leftElement = document.getElementById('left');
    const rightElement = document.getElementById('right');
    var imageElement = document.getElementById('m_img');
    var textElement = document.getElementById('txt_card');
    // Програмные переменные

    const m_img1 = './img/WLEJmAeugbw%201.png';
    const m_img2 = './img/5488082.png';
    const c_txt1 = "В школе прошёл “Хакатон по информатике”"
    const c_txt2 = "Данная карточка не заполнена."

    
    imageElement.src = m_img1;
    textElement.textContent = c_txt1;
    leftElement.addEventListener('click', function() {
        imageElement.src = m_img2;
        textElement.textContent = c_txt2;
        console.log('Вы нажали на элемент с ID "left"');
        // Добавьте здесь ваш код для выполнения определенных действий
    });
    rightElement.addEventListener('click', function() {
        imageElement.src = m_img1;
        textElement.textContent = c_txt1;
        console.log('Вы нажали на элемент с ID "left"');
        // Добавьте здесь ваш код для выполнения определенных действий
    });



    var localStorageValue = localStorage.getItem('last');
    var iframe = document.getElementById('frame');
    if (localStorageValue === 'true') {
        // Если значение 'last' равно 'true', скрываем iframe

        if (iframe) {
            iframe.style.display = 'none';
        }
    } else {
        // Если 'last' отсутствует или не равно 'true', показываем iframe

        if (iframe) {
            iframe.style.display = 'block';
        }
    }

    // Обработчик нажатия кнопки "Согласен"
    var iframeDoc = iframe.contentWindow.document;
    // Теперь можем получить доступ к элементам внутри iframe
    var elementInsideIframe = iframeDoc.getElementById('submit');



    iframe.onload = function() {
        var iframeDoc = iframe.contentWindow.document;
        // Теперь можем получить доступ к элементам внутри iframe
        var elementInsideIframe = iframeDoc.getElementById('submit');
        if (elementInsideIframe) {
            console.log('test')
            elementInsideIframe.addEventListener('click', function() {
                // Устанавливаем значение 'last' в локальное хранилище
                console.log('Created')
                localStorage.setItem('last', 'true');

                // Скрываем iframe после нажатия на кнопку

                if (iframe) {
                    iframe.style.display = 'none';
                };
            });
        }
    };

    /*if (elementInsideIframe) {
        console.log('test')
        elementInsideIframe.addEventListener('click', function() {
            // Устанавливаем значение 'last' в локальное хранилище
            console.log('Created')
            localStorage.setItem('last', 'true');

            // Скрываем iframe после нажатия на кнопку

            if (iframe) {
                iframe.style.display = 'none';
            };
        });
    }*/

});
function rasp(){
    const currentDomain = window.location.protocol + "//" + window.location.host;
    const href = currentDomain + "/schedule/";

    location.replace(href)
}
function toggleModal() {
    const animatedElement = document.querySelector('.modal_window');
    console.log('clck');
    const modal = document.getElementById('modalbg');
    modal.style.display = 'flex';
    modal.classList.toggle('modal-visible');
    animate();

    function animate() {
        // Добавляем класс для запуска анимации
        animatedElement.classList.add('animate-slide');
    }

    const butcl = document.getElementById('close_btn');
    butcl.onclick = function () {
        animate();
        function animate() {
            // Добавляем класс для запуска анимации закрытия
            animatedElement.classList.add('unanimate-slide');
        }
        modal.classList.toggle('modal-visible');
        setTimeout(() => {

            modal.style.display = 'none';
            // Убираем класс анимации закрытия
            animatedElement.classList.remove('unanimate-slide');
        }, 300); // Укажите тот же период, что и в анимации закрытия
    };
}

function toggleModal2() {
    const animatedElement = document.querySelector('.modal_window2');
    console.log('clck');
    const modal = document.getElementById('modalbg2');
    modal.style.display = 'flex';
    modal.classList.toggle('modal-visible');
    animate();

    function animate() {
        // Добавляем класс для запуска анимации
        animatedElement.classList.add('animate-slide');
    }

    const butcl = document.getElementById('close_btn2');
    butcl.onclick = function () {
        animate();
        function animate() {
            // Добавляем класс для запуска анимации закрытия
            animatedElement.classList.add('unanimate-slide');
        }
        modal.classList.toggle('modal-visible');
        setTimeout(() => {

            modal.style.display = 'none';
            // Убираем класс анимации закрытия
            animatedElement.classList.remove('unanimate-slide');
        }, 300); // Укажите тот же период, что и в анимации закрытия
    };
}
