const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const pagesRequestApp2 = express();

pagesRequestApp2.use(fileUpload());
pagesRequestApp2.use(express.json());

const calendarPath = path.join(__dirname, 'public', 'schedule');
const filesPath = path.join(calendarPath, 'files');
const configPath = path.join(calendarPath, 'config.json');
const dataPath = path.join(calendarPath, 'files.json');

// Читаем текущее значение счетчика из файла config.json
let fileCount = 0;

fs.readFile(configPath, 'utf8', (err, data) => {
    if (!err) {
        const config = JSON.parse(data);
        fileCount = config.file_count || 0;
    }
});

// POST-запрос на загрузку файла
// POST-запрос на загрузку файла
// POST-запрос на загрузку файла
// POST-запрос на загрузку файла
pagesRequestApp2.post('/admin/dashboard/create', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Файл не был загружен.');
    }

    const uploadedFile = req.files.uploadedFile;
    const dateInput = req.body.dateInput;

    // Сохраняем файл в папку /schedule/files
    const originalFileName = uploadedFile.name;
    const fileExtension = path.extname(originalFileName);
    const fileName = `${fileCount + 1}${fileExtension}`;
    const filePath = path.join(filesPath, fileName);

    uploadedFile.mv(filePath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        // Увеличиваем счетчик в config.json
        fileCount += 1;
        const configData = { file_count: fileCount };
        fs.writeFileSync(configPath, JSON.stringify(configData, null, 2));

        // Формируем объект с данными
        const formData = {
            id: fileCount,
            data: dateInput,
            name: fileName // Вот изменение
        };

        // Записываем данные в файл files.json
        let filesData = [];
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (!err) {
                filesData = JSON.parse(data);
            }

            filesData.push(formData);
            fs.writeFileSync(dataPath, JSON.stringify(filesData, null, 2));

            res.json({
                "message": "Расписание загружено УСПЕШНО!"
            })
        });
    });
});


// GET-запрос для отображения страницы с формой загрузки файла
pagesRequestApp2.get('/schedule', (req, res) => {
    const pagePath = path.join(__dirname, 'public', 'schedule', 'index.html');
    fs.readFile(pagePath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('Страница не найдена.');
        } else {
            res.send(data);
        }
    });
});
// GET-запрос для получения данных из файла files.json
pagesRequestApp2.get('/schedule/data', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Ошибка чтения файла данных.');
        } else {
            const filesData = JSON.parse(data);
            res.json(filesData);
        }
    });
});


// POST-запрос на удаление файла
// POST-запрос на удаление файла
pagesRequestApp2.post('/admin/dashboard/create/del', (req, res) => {
    const fileIdToDelete = req.body.del;

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading data file.' });
        }

        let filesData = JSON.parse(data);
        const fileToDelete = filesData.find(file => file.id === fileIdToDelete);

        if (!fileToDelete) {
            return res.status(404).json({ message: 'File not found.' });
        }

        const filePathToDelete = path.join(filesPath, fileToDelete.name);

        // Удаление файла из папки files
        fs.unlink(filePathToDelete, err => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting file.' });
            }

            // Удаление объекта с информацией о файле из files.json
            filesData = filesData.filter(file => file.id !== fileIdToDelete);
            fs.writeFileSync(dataPath, JSON.stringify(filesData, null, 2));

            res.json({ message: 'File deleted successfully' });
        });
    });
});
// GET-запрос для получения данных из файла files.json
pagesRequestApp2.get('/admin/dashboard/create/data', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Ошибка чтения файла данных.');
        } else {
            const filesData = JSON.parse(data);
            res.json(filesData);
        }
    });
});



module.exports = pagesRequestApp2;
