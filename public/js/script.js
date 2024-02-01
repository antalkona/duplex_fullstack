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
    function generate16DigitCode() {
        let code = '';
        const characters = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

        for (let i = 0; i < 16; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }

        return code;
    }
    const myVariable = generate16DigitCode();
    const platform = navigator.platform
    const language = navigator.language
    const appVersion = navigator.appVersion;
    const currentUrl = window.location.href;


    fetch("/userdata", {
        method: "POST",
        body: JSON.stringify({
            "code": myVariable,
            "platform": platform,
            "language": language,
            "appVersion": appVersion,
            "url": currentUrl
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        // Обработка ответа сервера, если нужно
    });

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
function studentsmodal(){
    const modalBg = document.getElementById('moadlbg-1');
    modalBg.style.display = 'flex'



    fetch('/students', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            datai = data;  // Assigning the fetched data to datai
            datai.sort((a, b) => {
                const priorityA = parseInt(a.priority) || 0;
                const priorityB = parseInt(b.priority) || 0;

                return priorityA - priorityB;
            });
            const mainContainer = document.getElementById('stud_cont');

            console.log(datai);
            console.log(datai.length)
            const cont = document.getElementById('m_')
            for (let i = 0; i < datai.length; i++) {
                // Ваш код, который нужно выполнить для каждого элемента массива
                let lesObj = datai[i].id
                let priObj = datai[i].priority
                let txtObj = datai[i].text
                let linObj = datai[i].link
                const div = document.createElement('div');
                div.className = 'objl';
                div.id = `div-${lesObj}`;
                div.innerHTML = `
                                <a href="${linObj}" class="mod_link">${txtObj}</a>
               
            `;
                mainContainer.appendChild(div);}
        })
        .catch(error => {
            console.error('Error:', error);});

}
function parentsmodal(){
    const modalBg = document.getElementById('moadlbg-2');
    modalBg.style.display = 'flex'



    fetch('/parents', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            datai = data;  // Assigning the fetched data to datai
            datai.sort((a, b) => {
                const priorityA = parseInt(a.priority) || 0;
                const priorityB = parseInt(b.priority) || 0;

                return priorityA - priorityB;
            });
            const mainContainer = document.getElementById('pare_cont');

            console.log(datai);
            console.log(datai.length)
            const cont = document.getElementById('m_')
            for (let i = 0; i < datai.length; i++) {
                // Ваш код, который нужно выполнить для каждого элемента массива
                let lesObj = datai[i].id
                let priObj = datai[i].priority
                let txtObj = datai[i].text
                let linObj = datai[i].link
                const div = document.createElement('div');
                div.className = 'objl';
                div.id = `div-${lesObj}`;
                div.innerHTML = `
                                <a href="${linObj}" class="mod_link">${txtObj}</a>
               
            `;
                mainContainer.appendChild(div);}
        })
        .catch(error => {
            console.error('Error:', error);});

}

function closeMoadl(id){
    const modalBg = document.getElementById(`moadlbg-${id}`);
    modalBg.style.display = 'none'
    if (modalBg) {
        modalBg.innerHTML = ''; // Очищаем содержимое div
        modalBg.innerHTML = `<div class="modalw">
        <div class="m_header">
            <div class="m_t_box">
                <h1 class="m_title">Ученикам</h1>
                <div class="blueline"></div>

            </div>

            <img src="./img/close.png" alt="" onclick="closeMoadl(1)" class="closem">
        </div>
        <div class="m_cont" id="stud_cont">

        </div>
    </div>` ; // Очищаем содержимое div

    }
}
