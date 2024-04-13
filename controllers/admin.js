const express = require('express');
const fs = require("fs");
const path = require("path"); // Импорт функции message из telegram_bot.js
const randomNumber = Math.floor(Math.random() * (901) + 100);
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');


require('dotenv').config();

function generateAccessToken(person) {
    return jwt.sign({ userId: person.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
}
function generateRefreshToken(person) {
    return jwt.sign({ userId: person.id }, process.env.JWT_SECRET, { expiresIn: '15d' });
}


class admin{
    async adminLogin(req, res, next) {
        try{
            if (((req.body && req.body.user) || (req.body && req.body.password))) {
                console.log(req.body)
                const {user, password} = req.body;
                const filePath = path.join(__dirname, '..', 'config', 'admin_users.json');
                let users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                const person = users.find(person => person.login === user);
                if (!person) return res.status(200).json({message: 'Пользователь не найден " name'});
                const personPas = users.find(person => person.password === password);
                if (!personPas) return res.status(200).json({message: 'Пользователь не найден | pas'});
                const accessToken = generateAccessToken(person);
                const refreshToken = generateRefreshToken(person)
                person.refreshToken = refreshToken;
                person.accessToken = accessToken;
                fs.writeFileSync(filePath, JSON.stringify(users, null, 4));

                res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
                res.cookie('accessToken', accessToken, { maxAge: 900000 });
                return  res.status(200).json({message: 'Вход Успешно!'})
            }

            } catch (err){
            res.redirect('/admin')
            next(err)
        }
    }
    async refresh(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            const filePath = path.join(__dirname, '..', 'config', 'admin_users.json');
            let users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const user = users.find(user => user.refreshToken === refreshToken);
            if (!user) return res.redirect('/admin');
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
                const accessToken = generateAccessToken(user);
                const newRefreshToken = generateRefreshToken(user)
                user.refreshToken = newRefreshToken;
                user.accessToken = accessToken;
                fs.writeFileSync(filePath, JSON.stringify(users, null, 4));
                res.cookie('accessToken', accessToken, { httpOnly: false, maxAge: 900000 });
                res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

                res.redirect(req.headers.referer || '/admin/menu');
            });



        } catch (err){
            res.redirect('/admin')
            next(err)
        }
    }
    async datareq(req, res, next){
        try{
            const decodedToken = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET);
            if (!decodedToken) { return res.status(500).json({ message: 'Неверный токен.' }); }
            const filePath = path.join(__dirname, '..', 'config', 'admin_users.json');
            let users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const user = users.find(user => user.id === decodedToken.userId);
            if (!user) return res.status(500).json({ message: 'Неверный токен пользователя.' });
            const userData = {
                userName: user.name,
                userId: user.id,
                previs: user.premise
            }
            return res.json(userData);


        } catch (err){
            res.redirect('/admin')

            next(err)
        }
    }
    async logout(req, res, next){
        try {
            res.clearCookie('refreshToken')
            res.clearCookie('accessToken')
            res.redirect('/')
        }catch (err){
            next(err)
        }
    }


    async sendshed(req, res, next) {
        try {
            const saveFilePath = path.join(__dirname, '..', 'public', 'schedule', 'files');
            if (!req.files || Object.keys(req.files).length === 0) {
                throw new Error('No file uploaded');
            }
            const uploadedFile = req.files.file;
            const fileExtension = path.extname(uploadedFile.name);
            const randomCode = Math.floor(100000 + Math.random() * 900000);
            const newFileName = `${randomCode}${fileExtension}`;
            const newFilePath = path.join(saveFilePath, newFileName);
            await uploadedFile.mv(newFilePath);
            const configFilePath = path.join(saveFilePath, '..', 'config.json');
            const configData = fs.readFileSync(configFilePath, 'utf8');
            const config = JSON.parse(configData);
            let id = config.id || 0;
            id++;
            const updatedConfig = { id };
            fs.writeFileSync(configFilePath, JSON.stringify(updatedConfig, null, 2));
            const fileDate = req.body.fileDate;
            const filesFilePath = path.join(saveFilePath, '..', 'files.json');
            const filesData = fs.readFileSync(filesFilePath, 'utf8');
            const files = JSON.parse(filesData);
            const newFileEntry = {
                id: id,
                data: fileDate,
                name: newFileName
            };
            files.push(newFileEntry);
            fs.writeFileSync(filesFilePath, JSON.stringify(files, null, 2));
            res.status(200).send('File saved successfully');
        } catch (err) {
            console.error('Error processing request:', err);
            next(err);
        }
    }
    async sheddat(req, res, next) {
        const gilePatch = path.join(__dirname, '..', 'public', 'schedule', 'files.json');
        console.log("+")
        fs.readFile(gilePatch, 'utf8', (err, data) => {
            if (err) {
                console.log("error")
                res.status(200).send('Ошибка чтения файла данных.');
            } else {
                const filesData = JSON.parse(data);
                console.log(filesData);
                res.json(filesData);
            }
        });
    }
    async sheddatDel(req, res, next) {
        try {
            const fileIdToDelete = req.body.del;
            const gilePatch = path.join(__dirname, '..', 'public', 'schedule', 'files.json');

            // Используем асинхронный метод fs.readFile вместо колбэка для удобства работы с промисами
            const data = await fs.promises.readFile(gilePatch, 'utf8');
            let filesData = JSON.parse(data);

            // Исправляем опечатку: должно быть filesData, а не gilePatch
            const fileToDelete = filesData.find(file => file.name === fileIdToDelete);

            if (!fileToDelete) {
                // Изменяем статус ответа на 404, так как файл не найден
                return res.status(404).json({ message: 'File not found.' });
            }

            const filePathToDelete = path.join(__dirname, '..', 'public', 'schedule', 'files', fileToDelete.name);

            // Используем асинхронный метод fs.unlink вместо колбэка для удобства работы с промисами
            await fs.promises.unlink(filePathToDelete);

            // Удаление объекта с информацией о файле из filesData
            filesData = filesData.filter(file => file.name !== fileIdToDelete);
            await fs.promises.writeFile(gilePatch, JSON.stringify(filesData, null, 2));

            // Исправляем статус ответа на 200, так как операция прошла успешно
            res.status(200).json({ message: 'File deleted successfully' });
        } catch (error) {
            // Возвращаем ошибку сервера с соответствующим статусом
            console.error('Ошибка при удалении файла:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async cPages(req, res, next){
        try{

        }catch (err){
            next(err)
        }
    }




}
module.exports = new admin();
