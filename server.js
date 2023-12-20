// ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ + ПОДКЛЮЧЕНИЕ МОДУЛЕЙ
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); // Добавлено для парсинга тела запроса
//const { fork } = require('child_process');
const app = express();
// ---------------------------------------------------------------


// ПОДКЛЮЧЕНИЕ ИСПОЛЬЗОВАНИЙ К ПРИЛОЖЕНИЮ
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.json()); // Используем bodyParser для парсинга JSON данных
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





// ПОСТ ЗАПРОСЫ

app.post('/admin', (req, res) => {
    console.log('Json +')
    const statusFilePath = './config/status.json';
    const statusFilePath2 = './config/admin_users.json'; // путь к базе
    if (req.body && req.body.login && req.body.password) {
        const { login, password } = req.body;
        const statusData = JSON.parse(fs.readFileSync(statusFilePath2, 'utf8'));

        const user = statusData.find(user => user.lgoin === login && user.password === password);

        if (user) {
            return res.status(200).json({ message: 'Успешная авторизация', user });
        } else {
            return res.status(401).json({ error: 'Неправильный логин или пароль' });
        }
    } else {
        return res.status(400).json({ error: 'Логин и пароль обязательны' });
    }


    if (req.body && req.body.statreq === 'false'){
        const statusData = JSON.parse(fs.readFileSync(statusFilePath, 'utf8'));
        //const requestedKey = 'cite_open'; // Можно заменить на нужный ключ
        //const value = statusData[requestedKey];
        //const response = { ['cite_open']: statusData['site_open'] };
        res.json({
            "cite_open": statusData["cite_open"],
            "cite_dev": statusData["cite_dev"],
        });



    }

    if (req.body && req.body.open === 'false') {
        const statusData = JSON.parse(fs.readFileSync(statusFilePath, 'utf8'));
        statusData.cite_open = "false";
        fs.writeFileSync(statusFilePath, JSON.stringify(statusData, null, 2));


        fs.renameSync('public/index.html', 'public/noindex.html');
        fs.renameSync('public/closed.html', 'public/index.html');

        res.json({
            "cite_open": "false",
        });
    }
    if (req.body && req.body.open === 'true') {
        const statusData = JSON.parse(fs.readFileSync(statusFilePath, 'utf8'));
        statusData.cite_open = "true";
        fs.writeFileSync(statusFilePath, JSON.stringify(statusData, null, 2));

        console.log(`Получен POST за прос со стра ницы /admin содержащий : `, req.body);
        fs.renameSync('public/index.html', 'public/closed.html');
        fs.renameSync('public/noindex.html', 'public/index.html');

        res.json({
            "cite_open": "true",
        });
    }
    if (req.body && req.body.dev === 'false') {
        const statusData = JSON.parse(fs.readFileSync(statusFilePath, 'utf8'));
        statusData.cite_dev = "false";
        fs.writeFileSync(statusFilePath, JSON.stringify(statusData, null, 2));

        console.log(`Получен POST запрос со стра ницы /admin содержащий : `, req.body);
        fs.renameSync('public/index.html', 'public/noindex.html');
        fs.renameSync('public/work.html', 'public/index.html');

        res.json({
            "cite_dev": "false",
        });
    }
    if (req.body && req.body.dev === 'true') {
        const statusData = JSON.parse(fs.readFileSync(statusFilePath, 'utf8'));
        statusData.cite_dev = "true";
        fs.writeFileSync(statusFilePath, JSON.stringify(statusData, null, 2));

        console.log(`Получен POST за прос со стра ницы /admin содержащий : `, req.body);
        fs.renameSync('public/index.html', 'public/work.html');
        fs.renameSync('public/noindex.html', 'public/index.html');

        res.json({
            "cite_dev": "true",
        });
    }
});






// app.post('/admin', (req, res) => {
//     console.log('Получен post запрос')
//     const postData = req.body;
//
//     if ('open' in postData) {
//         console.log('post запрос содержит open')
//         if (postData.open === true) {
//             fs.renameSync('public/index.html', 'public/closed.html');
//             fs.renameSync('public/noindex.html', 'public/index.html');
//             console.log('post запрос содержит open со значением true')
//             res.json({ cite_status_change: true });
//         }
//         if (postData.open === false) { // Проверяем является ли значение false
//             console.log('post запрос содержит open со значением false')
//             res.json({ cite_status_change: false });
//
//         }
//     } else {
//         console.log('post запрос не содержит open')
//         res.json({ success: true });
//     }
// });




// Обработка POST запросов по адресу /admin
// app.post('/admin', (req, res) => {
//     // Возвращаем JSON { "success": true }
//     res.json({ success: true });
// });
// ---------------------------------------------------------------


// ЗАПУСК СЕРВЕРА
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
// ---------------------------------------------------------------
// "start": "node server.js"

// ЗАПУСК ФАЙЛА С ФУНКЦИЯМИ backend.
// const functionProcess = fork('function.js');
//
// functionProcess.on('message', (message) => {
//     // Обработка сообщений от function.js
//     console.log('Message from function.js:', message);
// });
// ---------------------------------------------------------------