// ПОДКЛЮЧЕНИЕ МОДУЛЕЙ
const express = require('express');
const fs = require("fs");
const { site_open, site_close, site_tex, site_notex } = require('./telegram_bot');
const path = require("path"); // Импорт функции message из telegram_bot.js
const randomNumber = Math.floor(Math.random() * (901) + 100);

// ИНИЦИАЛИЗАЦИЯ
const postRequestApp = express();


// ФУНКЦИАНАЛ
postRequestApp.post('/admin', (req, res) => {
    console.log('Json +')
    const statusFilePath = './config/status.json';
    const statusFilePath2 = './config/admin_users.json'; // путь к базе
    if (req.body && req.body.login && req.body.password) {
        const {login, password} = req.body;
        const statusData = JSON.parse(fs.readFileSync(statusFilePath2, 'utf8'));

        const user = statusData.find(user => user.lgoin === login && user.password === password);

        if (user) {
            return res.status(200).json({message: 'Успешная авторизация', user});
        } else {
            return res.status(401).json({error: 'Неправильный логин или пароль'});
        }
    }
});


postRequestApp.post('/admin/dashboard', (req, res) => {
    const statusFilePath = './config/status.json';
    const statusFilePath2 = './config/admin_users.json'; // путь к базе
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
    if (req.body && req.body.config_req){
        const statusFilePath = './config/status.json';
        fs.readFile(statusFilePath, 'utf8', (err, data) => {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        })
    }

    if (req.body && req.body.open === 'false') {
        const statusData = JSON.parse(fs.readFileSync(statusFilePath, 'utf8'));
        statusData.cite_open = "false";
        fs.writeFileSync(statusFilePath, JSON.stringify(statusData, null, 2));


        fs.renameSync('public/index.html', 'public/noindex.html');
        fs.renameSync('public/closed.html', 'public/index.html');

        res.json({
            "message": "Сайт закрыт.",
        });
        site_close()
    }
    if (req.body && req.body.open === 'true') {
        const statusData = JSON.parse(fs.readFileSync(statusFilePath, 'utf8'));
        statusData.cite_open = "true";
        fs.writeFileSync(statusFilePath, JSON.stringify(statusData, null, 2));

        console.log(`Получен POST за прос со стра ницы /admin содержащий : `, req.body);
        fs.renameSync('public/index.html', 'public/closed.html');
        fs.renameSync('public/noindex.html', 'public/index.html');

        res.json({
            "message": "Сайт открыт.",
        });
        site_open()
    }
    if (req.body && req.body.dev === 'false') {
        const statusData = JSON.parse(fs.readFileSync(statusFilePath, 'utf8'));
        statusData.cite_dev = "false";
        fs.writeFileSync(statusFilePath, JSON.stringify(statusData, null, 2));

        console.log(`Получен POST запрос со стра ницы /admin содержащий : `, req.body);
        fs.renameSync('public/index.html', 'public/noindex.html');
        fs.renameSync('public/work.html', 'public/index.html');

        res.json({
            "message": "Сайт закрыт на тех.работы",
        });
        site_notex()
    }
    if (req.body && req.body.dev === 'true') {
        const statusData = JSON.parse(fs.readFileSync(statusFilePath, 'utf8'));
        statusData.cite_dev = "true";
        fs.writeFileSync(statusFilePath, JSON.stringify(statusData, null, 2));

        console.log(`Получен POST за прос со стра ницы /admin содержащий : `, req.body);
        fs.renameSync('public/index.html', 'public/work.html');
        fs.renameSync('public/noindex.html', 'public/index.html');

        res.json({
            "message": "Тех работы завершены.",
        });
        site_tex()
    }

});


postRequestApp.get('/admin/dev/check/server-cfg', (req, res) => {
    console.log('Json +')
    res.send(`https://[доменное имя сайта]/admin/dev/server-cfg/code/${randomNumber}`);

})
postRequestApp.get('/admin/dev/check/admin-users', (req, res) => {
    console.log('Json +')
    res.send(`https://[доменное имя сайта]/admin/dev/admin-users/code/${randomNumber}`);

})
postRequestApp.get(`/admin/dev/check/server-cfg/code/${randomNumber}`, (req, res) => {
    console.log('Json +');

    const filePath = path.join(__dirname, 'config', 'server_cfg.json'); // Путь к файлу

    try {
        const data = fs.readFileSync(filePath, 'utf8');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json;charset=utf-8');
        res.send(data);
    } catch (error) {
        console.error('Error reading file:', error);
        res.statusCode = 500;
        res.send('Error reading file');
    }
});
postRequestApp.get(`/admin/dev/check/admin-users/code/${randomNumber}`, (req, res) => {
    console.log('Json +');

    const filePath = path.join(__dirname, 'config', 'admin_users.json'); // Путь к файлу

    try {
        const data = fs.readFileSync(filePath, 'utf8');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json;charset=utf-8');
        res.send(data);
    } catch (error) {
        console.error('Error reading file:', error);
        res.statusCode = 500;
        res.send('Error reading file');
    }
});
// СОЗДАНИЕ МОДУЛЯ
module.exports = postRequestApp;
