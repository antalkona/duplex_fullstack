const express = require('express');
const fs = require("fs");
const path = require('path');

const startRequest = express.Router(); // Заменяем express() на express.Router()

startRequest.get('/start', (req, res) => {
    const indexPath = path.join(__dirname, 'start', 'index.html');
    const data = fs.readFileSync(indexPath, 'utf8');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.end(data);
});
startRequest.post('/start', (req, res) => {
    if (req.body && req.body.ADMINSET) {
        // Получаем данные из тела запроса
        const {id, lgoin, name, password} = req.body.ADMINSET;

        // Читаем файл admin_users.json
        const filePath = path.join(__dirname, 'config', 'admin_users.json');
        const adminUsers = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Создаем нового пользователя
        const newUser = {id, lgoin, name, password};

        // Добавляем нового пользователя в массив пользователей
        adminUsers.push(newUser);

        // Записываем обновленные данные обратно в файл admin_users.json
        fs.writeFileSync(filePath, JSON.stringify(adminUsers, null, 2));

        res.status(200).json({message: 'Новый пользователь добавлен'});
    }
    if (req.body && req.body.LOCALSERVER) {
        // Получаем данные из тела запроса
        const {SERVER_NAME, SERVER_DOMAIN, SERVER_PORT} = req.body.LOCALSERVER;

        // Читаем файл server_cfg.json
        const filePath = path.join(__dirname, 'config', 'server_cfg.json');
        const ServerCfgs = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Обновляем значения внутри LOCALSERVER
        if (ServerCfgs.LOCALSERVER) {
            ServerCfgs.LOCALSERVER['SERVER-NAME'] = SERVER_NAME;
            ServerCfgs.LOCALSERVER['SERVER-DOMAIN'] = SERVER_DOMAIN;
            ServerCfgs.LOCALSERVER['SERVER-PORT'] = SERVER_PORT;
            // ... остальные данные
        }

        // Записываем обновленные данные обратно в файл server_cfg.json
        fs.writeFileSync(filePath, JSON.stringify(ServerCfgs, null, 2));

        res.status(200).json({message: 'Данные SERVER LICENZE обновлены'});
    }
    if (req.body && req.body.LOCALSERVER2) {
        // Получаем данные из тела запроса
        const {PANEL, LECENZE, EMAIL} = req.body.LOCALSERVER2;

        // Читаем файл server_cfg.json
        const filePath = path.join(__dirname, 'config', 'server_cfg.json');
        const ServerCfgs = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Обновляем значения внутри LOCALSERVER
        if (ServerCfgs.LOCALSERVER) {
            ServerCfgs.LOCALSERVER['SERVER-HOSTING'] = PANEL;
            ServerCfgs.LOCALSERVER['LES'] = LECENZE;
            ServerCfgs.LOCALSERVER['EMAIL'] = EMAIL;
            // ... остальные данные
        }

        // Записываем обновленные данные обратно в файл server_cfg.json
        fs.writeFileSync(filePath, JSON.stringify(ServerCfgs, null, 2));

        res.status(200).json({message: 'Данные LOCALSERVER обновлены'});
    } else {
        res.status(400).json({message: 'Неверный формат запроса'});
    }
})
module.exports = startRequest;

