
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
function closeMoadl2(id){
    const modalBg = document.getElementById(`moadlbg-${id}`);
    modalBg.style.display = 'none'
    if (modalBg) {
        modalBg.innerHTML = ''; // Очищаем содержимое div
        modalBg.innerHTML = `<div class="modalw">
        <div class="m_header">
            <div class="m_t_box">
                <h1 class="m_title">Родителям</h1>
                <div class="blueline"></div>

            </div>

            <img src="./img/close.png" alt="" onclick="closeMoadl2(2)" class="closem">
        </div>
        <div class="m_cont" id="pare_cont">

        </div>
    </div>` ; // Очищаем содержимое div

    }
}


// Получаем ширину экрана
