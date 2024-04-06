const express = require('express');
const fs = require("fs");
const path = require("path"); // Импорт функции message из telegram_bot.js
const randomNumber = Math.floor(Math.random() * (901) + 100);
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

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
}
module.exports = new admin();
