const express = require('express');
const fs = require("fs");
const path = require('path');


const mainPage = express();

mainPage.post('/data', (req, res) => {
    const caruselPath = path.join(__dirname, 'public', 'assets', 'carusel.json')
    fs.readFile(caruselPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Ошибка чтения файла данных.');
        } else {
            const filesData = JSON.parse(data);
            res.json(filesData);
        }
    });
})
mainPage.post('/admin/mainpage', (req, res) => {
    if (req.body && req.body.title) {
        const pageTitle = req.body.title.trim();  // Получаем заголовок страницы из POST-запроса
        const filePath = path.join(__dirname, 'public', 'index.html');
        let fileContent = fs.readFileSync(filePath, 'utf8');  // Читаем содержимое нового файла

        // Заменяем содержимое тега <title> с учетом возможных пробелов и символов новой строки
        fileContent = fileContent.replace(/<title>[\s\S]*<\/title>/, `<title>${pageTitle}</title>`);

        fs.writeFileSync(filePath, fileContent, 'utf8');  // Записываем обновленное содержимое в файл

        res.status(200).json({ message: 'Заголовки успешно обновлены' });
    } else if  (req.body && req.body.card1 || req.body.card2 || req.body.card3) {
        const requestData = req.body;
        const filePath = './public/assets/carusel.json';
        const currentData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        if (requestData.card1) {
            currentData.card1 = requestData.card1;
        }
        if (requestData.card2) {
            currentData.card2 = requestData.card2;
        }
        if (requestData.card3) {
            currentData.card3 = requestData.card3;
        }

        fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2), 'utf-8');
        res.status(200).json({ message: 'Данные успешно обновлены' });
    }
});
const readPagesJsonFile = () => {
    try {
        const pagesJsonData = fs.readFileSync(parentsFilePath, 'utf8');  // Читаем файл с информацией о страницах
        return JSON.parse(pagesJsonData);  // Парсим JSON из файла
    } catch (error) {
        console.error('Error reading pages.json file:', error.message);
        return null;  // В случае ошибки возвращаем null
    }
};
mainPage.post('/admin/mainpage/parents', (req, res) => {
    // Определение путей к папке и файлу
    const pagesFolderPath = path.join(__dirname, 'public', 'assets');
    const parentsFilePath = path.join(pagesFolderPath, 'parents.json');

    // Создание объекта с новыми данными
    const newLink = {
        id: req.body.id,
        text: req.body.text,
        link: req.body.link,
        priority: req.body.priority,
    };
    const currentData = JSON.parse(fs.readFileSync(parentsFilePath, 'utf8')) || [];    // Чтение текущих данных из файла или использование пустого массива, если чтение не удалось
    currentData.push(newLink); // Добавление новых данных
    fs.writeFileSync(parentsFilePath, JSON.stringify(currentData, null, 2), 'utf8'); // Запись обновленных данных обратно в файл
    res.status(200).json({ message: 'Данные успешно добавлены в файл' }); // Отправка успешного ответа клиенту
});
mainPage.post('/admin/mainpage/students', (req, res) => {
    // Определение путей к папке и файлу
    const pagesFolderPath = path.join(__dirname, 'public', 'assets');
    const parentsFilePath = path.join(pagesFolderPath, 'students.json');

    // Создание объекта с новыми данными
    const newLink = {
        id: req.body.id,
        text: req.body.text,
        link: req.body.link,
        priority: req.body.priority,
    };
    const currentData = JSON.parse(fs.readFileSync(parentsFilePath, 'utf8')) || [];    // Чтение текущих данных из файла или использование пустого массива, если чтение не удалось
    currentData.push(newLink); // Добавление новых данных
    fs.writeFileSync(parentsFilePath, JSON.stringify(currentData, null, 2), 'utf8'); // Запись обновленных данных обратно в файл
    res.status(200).json({ message: 'Данные успешно добавлены в файл' }); // Отправка успешного ответа клиенту
});

mainPage.post('/parents', (req, res) => {
    const caruselPath = path.join(__dirname, 'public', 'assets', 'parents.json')
    fs.readFile(caruselPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Ошибка чтения файла данных.');
        } else {
            const filesData = JSON.parse(data);
            res.json(filesData);
        }
    });
})
mainPage.post('/students', (req, res) => {
    const caruselPath = path.join(__dirname, 'public', 'assets', 'students.json')
    fs.readFile(caruselPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Ошибка чтения файла данных.');
        } else {
            const filesData = JSON.parse(data);
            res.json(filesData);
        }
    });
})
mainPage.post('/admin/mainpage/students/del', (req, res) => {
    if (req.body && req.body.del) {
        const caruselPath = path.join(__dirname, 'public', 'assets', 'students.json');

        // Чтение данных из файла
        fs.readFile(caruselPath, 'utf8', (err, data) => {
            if (err) return res.status(500).json({ message: "Ошибка при чтении файла" });

            // Попытка парсинга JSON и удаление объекта с указанным id
            const students = JSON.parse(data || '[]');
            const index = students.findIndex(student => student.id === req.body.del);
            if (index !== -1) students.splice(index, 1);

            // Запись изменений обратно в файл
            fs.writeFile(caruselPath, JSON.stringify(students, null, 2), 'utf8', (err) => {
                if (err) return res.status(500).json({ message: "Ошибка при записи файла" });

                return res.json({ message: "Успешно" });
            });
        });

    }

    if (req.body && req.body.edit && req.body.edit.id) {
        const caruselPath = path.join(__dirname, 'public', 'assets', 'students.json');

        // Чтение данных из файла
        fs.readFile(caruselPath, 'utf8', (err, data) => {
            if (err) return res.status(500).json({message: "Ошибка при чтении файла"});

            // Попытка парсинга JSON и поиск объекта с указанным id
            const students = JSON.parse(data || '[]');
            const index = students.findIndex(student => student.id === req.body.edit.id);

            if (index !== -1) {
                // Замена значений в объекте по указанному id
                students[index] = {
                    id: req.body.edit.id,
                    priority: req.body.edit.priority,
                    text: req.body.edit.text,
                    link: req.body.edit.link
                };

                // Запись изменений обратно в файл
                fs.writeFile(caruselPath, JSON.stringify(students, null, 2), 'utf8', (err) => {
                    if (err) return res.status(500).json({message: "Ошибка при записи файла"});

                    return res.json({message: "Успешно"});
                });
            } else {
                return res.status(404).json({message: "Студент с указанным id не найден"});
            }

        })
    }

});

mainPage.set('trust proxy', true); // Разрешаем использование заголовка X-Forwarded-For

mainPage.post('/userdata', (req, res) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const currentTime = new Date();
    const formattedTime = `${formatNumber(currentTime.getDate())}.${formatNumber(currentTime.getMonth() + 1)}.${currentTime.getFullYear()}/${formatNumber(currentTime.getHours())}:${formatNumber(currentTime.getMinutes())}`;

    function formatNumber(num) {
        return num.toString().padStart(2, '0');
    }
    const req_data = {
        "code": req.body.code,
        "platform": req.body.platform,
        "language": req.body.language,
        "appVersion": req.body.appVersion,
        "url": req.body.url,
        "time": formattedTime,
        "ip": clientIp
    };

    const pagesFolderPath = path.join(__dirname, 'logs', 'visits');
    const parentsFilePath = path.join(pagesFolderPath, 'visit.json');
    const currentData = JSON.parse(fs.readFileSync(parentsFilePath, 'utf8')) || [];    // Чтение текущих данных из файла или использование пустого массива, если чтение не удалось
    currentData.push(req_data); // Добавление новых данных
    fs.writeFileSync(parentsFilePath, JSON.stringify(currentData, null, 2), 'utf8'); // Запись обновленных данных обратно в файл
    console.log(req_data);
    // Далее можете обрабатывать данные или отправлять ответ клиенту
});

module.exports = mainPage;


