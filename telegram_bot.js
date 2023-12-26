// ПОДКЛЮЧЕНИЕ МОДУЛЕЙ
const fs = require('fs');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

// КОНФИГУРАЦИОННЫЕ НАСТРОЙКИ
const configFile = './config/server_cfg.json';
const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
const telegramToken = config.TELEGRAM['TELEGRAM-TOKEN'];
const loginCode = config.TELEGRAM['TG_LOGIN-CODE'];
let whiteList = config.TELEGRAM['TG_WHITE-LIST'];

// ФУНКЦИАНАЛ
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = `${hours}:${minutes}`;

    return time;
}

const currentTime = getCurrentTime();


// Функция для отправки сообщения всем пользователям из whiteList
function site_close() {
    const bot = new TelegramBot(telegramToken, { polling: true });

    whiteList.forEach((userId) => {
        bot.sendMessage(userId, 'Администратор закрыл сайт.');
    });
}
function site_open() {
    const bot = new TelegramBot(telegramToken, { polling: true });

    whiteList.forEach((userId) => {
        bot.sendMessage(userId, 'Администратор открыл сайт.');
    });
}
function site_tex() {
    const bot = new TelegramBot(telegramToken, { polling: true });

    whiteList.forEach((userId) => {
        bot.sendMessage(userId, 'Администратор закрыл сайт на технические работы.');
    });
}
function site_notex() {
    const bot = new TelegramBot(telegramToken, { polling: true });

    whiteList.forEach((userId) => {
        bot.sendMessage(userId, 'Администратор завершил технические работы и открыл сайт');
    });
}
function server_start() {
    const bot = new TelegramBot(telegramToken, { polling: true });

    whiteList.forEach((userId) => {
        bot.sendMessage(userId,     `<b>Сервер "Дуплекс" запущен.</b>\nСтатус: <u>работает</u>\nОшибок при старте: <u>0 ошибок</u>\nВремя запуска(МСК): <u>${currentTime}</u>`, { parse_mode: 'HTML' });
    });
}

function startTelegramBot() {
    const bot = new TelegramBot(telegramToken, { polling: true });

    // Объявляем функцию для обработки команды /start
    const handleStartCommand = (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, `Введите команду /login [код].`);
    };

    // Регистрируем обработчик для команды /start
    bot.onText(/\/start/, handleStartCommand);

    // Обработчик команды /login
    bot.onText(/\/login (.+)/, (msg, match) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const enteredCode = match[1];

        console.log('Введенный код:', enteredCode);
        console.log('Ожидаемый код из конфигурации:', loginCode);

        if (enteredCode === loginCode) {
            whiteList.push(userId.toString());
            fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
            bot.sendMessage(chatId, 'Вы авторизованы как администратор');
        } else {
            bot.sendMessage(chatId, 'Неверный код для авторизации');
        }
    });
}

// ЭКСПОРТ МОДУЛЯ
module.exports = { startTelegramBot, site_close, site_open, site_tex, site_notex, server_start };
