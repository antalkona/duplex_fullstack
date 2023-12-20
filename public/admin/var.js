//еуые
const requestURL = 'https://zentas.ru/admin';
document.getElementById("cite_close").addEventListener("click", function() {
    console.log('button clicked close')
    sendDataFalse();
});
document.getElementById("cite_open").addEventListener("click", function() {
    console.log('button clicked open')
    sendDataTrue();
});

function sendRequest(method, url, body = null) {
    const headers = {
        'Content-Type': 'application/json'
    };

    return fetch(url, {
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: headers,
        mode: 'cors' // Установка режима на 'cors' для работы с CORS
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok. Status: ' + response.status + ' - ' + response.statusText);
        }

        return response.json();
    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function sendDataFalse(){
    console.log('Отправлен запрос на закратие')
    const body = {
        "open": "false", // Используем булев тип данны
    };

    sendRequest('POST', requestURL, body)
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

function sendDataTrue(){
    console.log('Отправлен запрос на открытие')

    const body = {
        "open": "true", // Используем булев тип данных
    };

    sendRequest('POST', requestURL, body)
        .then(data => console.log(data))
        .catch(err => console.log(err));
}
