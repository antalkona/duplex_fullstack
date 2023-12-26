// ПОДКЛЮЧЕНИЕ МОДУЛЕЙ
const express = require('express');
const fs = require("fs");
const path = require("path");

// ИНИЦИАЛИЗАЦИЯ
const pagesRequestApp = express();

// ФУНКЦИАНАЛ
pagesRequestApp.get('/pages/:pageNumber', (req, res) => {
    const pageNumber = req.params.pageNumber;
    const pagePath = path.join(__dirname, 'public', 'pages', `${pageNumber}.html`);

    fs.readFile(pagePath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('Страница не найдена.');
        } else {
            res.send(data);
        }
    });
});

pagesRequestApp.post('/pages', (req, res) => {
    const content = req.body.content; // Получаем содержимое новой страницы из запроса
    const pagesFolderPath = path.join(__dirname, 'public', 'pages'); // Путь к папке с страницами
    const newPageNumber = fs.readdirSync(pagesFolderPath).length + 1; // Номер новой страницы
    const newPagePath = path.join(pagesFolderPath, `${newPageNumber}.html`); // Путь к новой странице

    fs.writeFile(newPagePath, content, (err) => { // Записываем содержимое в файл новой страницы
        if (err) {
            if (err.code === 'ENOENT') {
                res.status(500).send('Ошибка: папка или путь к файлу не существует.'); // Если папка или путь к файлу не существует
            } else {
                res.status(500).send(`Ошибка при создании страницы: ${err.message}`); // Общая ошибка при создании страницы
            }
        } else {
            res.status(201).send('Страница создана успешно!'); // Ответ об успешном создании страницы
        }
    });
});

// СОЗДАНИЕ МОДУЛЯ
module.exports = pagesRequestApp;
