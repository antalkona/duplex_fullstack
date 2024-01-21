const step1btn = document.getElementById('btn1')
const step1_div = document.getElementById('step1d')
const randomNumber = Math.floor(100000 + Math.random() * 900000);
const sixDigitNumber = randomNumber.toString(); // Преобразование числа в строку
const step2_div = document.getElementById('step2d')
const step3_div = document.getElementById('step3d')
const step4_div = document.getElementById('step4d')
const step5_div = document.getElementById('step5d')
const step6_div = document.getElementById('step6d')
const currentURL = window.location.href;





function step2(){
    step1_div.style.display = 'none'
    step2_div.style.zIndex = "5"
}

function step3(){
    const input_login = document.getElementById('a_login').value;
    const input_name = document.getElementById('a_name').value;
    const input_password = document.getElementById('a_pass').value;

    let data = {
        "ADMINSET":{
            "id": `${sixDigitNumber}`,
            "login": `${input_login}`,
            "name": `${input_name}`,
            "password": `${input_password}`
        }
    }
    console.log(data)
    fetch(currentURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log('Успешный ответ от сервера:', data);
            step2_div.style.display = 'none'
            step3_div.style.zIndex = "5"
        })
        .catch(error => {
            console.error('Ошибка отправки POST запроса:', error);
        });
}
function step4(){
    const input_sname = document.getElementById('server_name').value;
    const input_sdomen = document.getElementById('server_domen').value;
    const input_sport = document.getElementById('server_port').value;

    let data = {
        "LOCALSERVER":{
            "SERVER_NAME": `${input_sname}`,
            "SERVER_DOMAIN": `${input_sdomen}`,
            "SERVER_PORT": `${input_sport}`
        }
    }
    console.log(data)
    fetch(currentURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log('Успешный ответ от сервера:', data);
            step3_div.style.display = 'none'
            step4_div.style.zIndex = "5"
        })
        .catch(error => {
            console.error('Ошибка отправки POST запроса:', error);
        });
}
function step5(){
    const lecenze = document.getElementById('lencenze').value;
    const panel = document.getElementById('panel').value;

    const email = document.getElementById('email').value;

    let data = {
        "LOCALSERVER2":{
            "LECENZE": `${lecenze}`,
            "PANEL": `${panel}`,
            "EMAIL": `${email}`
        }
    }
    console.log(data)
    fetch(currentURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log('Успешный ответ от сервера:', data);
            step4_div.style.display = 'none'
            step5_div.style.zIndex = "5"
            setTimeout(step6, 30000);
        })
        .catch(error => {
            console.error('Ошибка отправки POST запроса:', error);
        });
}

function step6(){
    step5_div.style.display = 'none'
    step6_div.style.zIndex = "5"
}
step1btn.addEventListener('click', step2);
