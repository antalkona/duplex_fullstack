// ПОДКЛЮЧЕНИЕ МОДУЛЕЙ
const express = require('express');  // Подключаем модуль Express для создания сервера
const fs = require("fs");  // Подключаем модуль fs для работы с файловой системой
const path = require("path");  // Подключаем модуль path для работы с путями к файлам

// ИНИЦИАЛИЗАЦИЯ
const pagesRequestApp = express();  // Инициализируем Express приложение

// Парсер для обработки POST запросов
pagesRequestApp.use(express.urlencoded({ extended: true }));  // Используем middleware для парсинга данных из POST-запросов в формате URL-encoded
pagesRequestApp.use(express.json());  // Используем middleware для парсинга данных из POST-запросов в формате JSON

// ПУТИ К ФАЙЛАМ И ПАПКАМ
const pagesFolderPath = path.join(__dirname, 'public', 'pages');  // Формируем путь к папке с страницами
const configFilePath = path.join(pagesFolderPath, 'config.json');  // Формируем путь к файлу конфигурации
const pagesJsonFilePath = path.join(pagesFolderPath, 'pages.json');  // Формируем путь к файлу с информацией о страницах
const templateFilePath = path.join(pagesFolderPath, 'template.html');  // Формируем путь к шаблону страницы

// Создание папки для страниц, если её нет
if (!fs.existsSync(pagesFolderPath)) {
    fs.mkdirSync(pagesFolderPath);  // Если папка не существует, создаем её
}

// ФУНКЦИЯ ДЛЯ ЧТЕНИЯ ФАЙЛА КОНФИГУРАЦИИ
const readConfigFile = () => {
    try {
        const configData = fs.readFileSync(configFilePath, 'utf8');  // Читаем файл конфигурации
        return JSON.parse(configData);  // Парсим JSON из файла
    } catch (error) {
        console.error('Error reading config file:', error.message);
        return null;  // В случае ошибки возвращаем null
    }
};

// ФУНКЦИЯ ДЛЯ ЗАПИСИ ФАЙЛА КОНФИГУРАЦИИ
const writeConfigFile = (config) => {
    try {
        fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), 'utf8');  // Записываем конфигурацию в файл
    } catch (error) {
        console.error('Error writing config file:', error.message);
    }
};

// ФУНКЦИЯ ДЛЯ ЧТЕНИЯ ФАЙЛА PAGES.JSON
const readPagesJsonFile = () => {
    try {
        const pagesJsonData = fs.readFileSync(pagesJsonFilePath, 'utf8');  // Читаем файл с информацией о страницах
        return JSON.parse(pagesJsonData);  // Парсим JSON из файла
    } catch (error) {
        console.error('Error reading pages.json file:', error.message);
        return null;  // В случае ошибки возвращаем null
    }
};

// ФУНКЦИЯ ДЛЯ ЗАПИСИ ФАЙЛА PAGES.JSON
const writePagesJsonFile = (pages) => {
    try {
        fs.writeFileSync(pagesJsonFilePath, JSON.stringify(pages, null, 2), 'utf8');  // Записываем информацию о страницах в файл
    } catch (error) {
        console.error('Error writing pages.json file:', error.message);
    }
};

// Обработчик POST запроса /pages/create
pagesRequestApp.post('/pages/create', (req, res) => {
    // Чтение текущего значения file_count
    const config = readConfigFile();  // Вызываем функцию для чтения файла конфигурации
    if (!config) {
        res.status(500).send('Internal Server Error');  // В случае ошибки отправляем статус 500
        return;
    }

    const fileCount = config.file_count || 0;  // Получаем текущее значение file_count из конфигурации

    // Создание нового файла на основе шаблона
    const newFileName = `${fileCount + 1}.html`;  // Формируем имя нового файла
    const newFilePath = path.join(pagesFolderPath, newFileName);  // Формируем путь к новому файлу

    fs.copyFileSync(templateFilePath, newFilePath);  // Копируем содержимое шаблона в новый файл

    // Редактирование нового файла с учетом POST запроса
    const pageContent = req.body.content;  // Получаем содержимое страницы из POST-запроса
    const pageTitle = req.body.title;  // Получаем заголовок страницы из POST-запроса

    let fileContent = fs.readFileSync(newFilePath, 'utf8');  // Читаем содержимое нового файла
    fileContent = fileContent.replace('<title></title>', `<title>${pageTitle}</title>`);  // Заменяем заголовок в файле
    fileContent = fileContent.replace('<h1 class="title" id="p_title"></h1>', `<h1 class="title" id="p_title">${pageTitle}</h1>`);  // Заменяем заголовок в файле
    fileContent = fileContent.replace('<div id="content" class="contend"></div>', `<div id="content" class="contend">${pageContent}</div>`);  // Заменяем содержимое в файле

    fs.writeFileSync(newFilePath, fileContent, 'utf8');  // Записываем измененное содержимое обратно в файл

    // Обновление файлов конфигурации и pages.json
    config.file_count = fileCount + 1;  // Увеличиваем значение file_count

    const pages = readPagesJsonFile() || [];  // Читаем информацию о страницах
    const newPage = {
        id: (fileCount + 1).toString(),
        name: pageTitle,
        file: newFileName,
    };
    pages.push(newPage);  // Добавляем новую страницу в массив

    writeConfigFile(config);  // Записываем обновленную конфигурацию
    writePagesJsonFile(pages);  // Записываем обновленную информацию о страницах

    res.status(200).send(`Страница создана успешно.\n Номер страницы: ${fileCount + 1},\n Название: ${pageTitle},\n Название файла: ${newFileName}. \nURL: https://[доменное имя вашего сайта]/pages/${newFileName}`);  // Отправляем успешный статус
});

// Запуск сервера

module.exports = pagesRequestApp;  // Экспортируем Express приложение
