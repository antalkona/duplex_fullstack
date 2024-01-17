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
let serverName = config.LOCALSERVER['SERVER-NAME']

// ФУНКЦИАНАЛ
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = `${hours}:${minutes}`;

    return time;
}

const currentTime = getCurrentTime();

// Инициализируем бота один раз
const bot = new TelegramBot(telegramToken, { polling: true });

// Функция для отправки сообщения всем пользователям из whiteList
function site_close() {
    whiteList.forEach((userId) => {
        bot.sendMessage(userId, 'Администратор закрыл сайт.');
    });
}

function site_open() {
    whiteList.forEach((userId) => {
        bot.sendMessage(userId, 'Администратор открыл сайт.');
    });
}

function site_tex() {
    whiteList.forEach((userId) => {
        bot.sendMessage(userId, 'Администратор завершил технические работы и открыл сайт');
    });
}

function site_notex() {
    whiteList.forEach((userId) => {
        bot.sendMessage(userId, 'Администратор закрыл сайт на технические работы.');
    });
}

function server_start() {
    whiteList.forEach((userId) => {
        bot.sendMessage(userId, `<b>✅|Сервер "${serverName}" запущен.</b>\nСтатус: <u>работает</u>\nОшибок при старте: <u>0 ошибок</u>\nВремя запуска(МСК): <u>${currentTime}</u>\n----------\n <b>🔧| КОМАНДЫ:</b>\n /login - авторизация в проекте\n /logout - выход\n /status - статус сервера\n /reboot - перезапуск сервера\n\n <b><u>-📋ЛОГИ СЕРВЕРА:📋-</u></b>`, { parse_mode: 'HTML' });
    });
}

// ... (ваш существующий код)

function startTelegramBot() {
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

    // Обработчик команды /reboot
    bot.onText(/\/reboot/, (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;

        // Вызываем функцию перезапуска сервера
        restartServer(userId);
        function restartServer(userId) {
            if (whiteList.includes(userId.toString())) {

                bot.sendMessage(userId, 'Ваша панель сервера блокирует перезапуск.\n Выполните перезагрузку через вашу панель.');
            } else {
                bot.sendMessage(userId, 'У вас нет прав на выполнение этой команды.');
            }
        }
    });
    bot.onText(/\/logout/, (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;

        // Вызываем функцию удаления пользователя из whitelist
        logoutUser(userId);
        function logoutUser(userId) {
            const index = whiteList.indexOf(userId.toString());
            if (index !== -1) {
                whiteList.splice(index, 1);
                fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
                bot.sendMessage(userId, 'Вы вышли из системы. Теперь вы не являетесь администратором.');
            } else {
                bot.sendMessage(userId, 'Вы не авторизованы. Войдите снова с помощью команды /login.');
            }
        }

    });
}




// ЭКСПОРТ МОДУЛЯ
module.exports = { startTelegramBot, site_close, site_open, site_tex, site_notex, server_start };
