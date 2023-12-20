const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const fs = require('fs');
const connectToDB = require('./db_connect');
const cors = require('cors')



// ... ваш код


const app = express();
const PORT = process.env.PORT || 3000;

// Настройка статических файлов (HTML, CSS, изображения и т.д.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use(express.json());
// чтение json status

// Маршрут для основной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});
app.post('/admin', (req, res) => {
    console.log('Json +')
    if (req.body && req.body.open === 'false') {
        console.log(`Получен POST запрос со стра ницы /admin содержащий : `, req.body);
        fs.renameSync('public/index.html', 'public/noindex.html');
        fs.renameSync('public/closed.html', 'public/index.html');

        res.json({
            name: false,
        });
    }
    if (req.body && req.body.open === 'true') {
        console.log(`Получен POST за прос со стра ницы /admin содержащий : `, req.body);
        fs.renameSync('public/index.html', 'public/closed.html');
        fs.renameSync('public/noindex.html', 'public/index.html');

        res.json({
            name: true,
        });
    }


});


// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
