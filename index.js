// ПОДКЛЮЧЕНИЕ МОДУЛЕЙ
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); // Добавлено для парсинга тела запроса
// ---------------------------------------------------------------

// ПОДКЛЮЧЕНИЕ ФАЙЛОВ
const postRequestApp = require('./adminRoutes'); // Путь к файлу postRequest.js
const pageRequestApp = require('./create_pages'); // Путь к файлу postRequest.js

    // telegram bot  init
const { startTelegramBot, server_start } = require('./telegram_bot');
startTelegramBot();
server_start();
// ---------------------------------------------------------------

// ИНИЦИАЛИЗАЦИЯ БИБЛИОТЕК
const app = express(); // EXPRESS - для сайта
// ---------------------------------------------------------------

// ПАРЕСЕРЫ
// ---------------------------------------------------------------

// ПОДКЛЮЧЕНИЕ ИСПОЛЬЗОВАНИЙ К ПРИЛОЖЕНИЮ
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.json()); // Используем bodyParser для парсинга JSON данных

app.use(postRequestApp);
app.use(pageRequestApp)


// ---------------------------------------------------------------


// ПЕРЕАДРЕСАЦИИ
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    const data = fs.readFileSync(indexPath, 'utf8');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.end(data);
});
// ---------------------------------------------------------------






// STOP - STOP - STOP - STOP - STOP - STOP - STOP - STOP
// SERVER SETTINGS | НЕ ИЗМЕНЯТЬ -------------------------------
const PORT = process.env.PORT || 4000;
if ("SOCKET" in process.env) {
    const socket = process.env.SOCKET;
    if (fs.existsSync(socket)) {
        fs.unlinkSync(socket);
    }
    app.listen(socket, () => {
        fs.chmodSync(socket, 0660);
        console.log(`Listening :${socket}`);
    });
} else if ("PORT" in process.env) {
    app.listen(PORT, () => {
        console.log(`Listening http:/:${PORT}/`);
    });
}
// SERVER SETTINGS | НЕ ИЗМЕНЯТЬ  ----------------------------------
// STOP - STOP - STOP - STOP - STOP - STOP - STOP - STOP