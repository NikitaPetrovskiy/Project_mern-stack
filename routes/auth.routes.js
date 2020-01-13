const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const config = require('config');
const User = require('../models/User');

const router = Router();

//api/auth/register
router.post(
    '/register', 
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    massege: 'Некорректные данные при регистрации'
                })
            }

            const { email, password } = req.body;
            const candidate = await User.findOne({ email });

            if(candidate) {
                return res.status(400)
                    .json({ massege: 'Пользователь с таким email уже существует!' });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword });

            await user.save();
            res.status(201).json({ message: 'Пользователь создан' });
        } catch(e) {
            res.status(500)
                .json({ massege: 'Что-то пошло не так! Попробуйте снова.' });
            console.log('Server Error: ', e.message);
        }
});

//api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    massege: 'Некорректные данные при входе в систему.'
                })
            }

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400)
                .json({ massege: 'Пользователь не найден'});
        }

        const token = jwt(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        );

        res.json({ token, userId: user.id })

        const isMatch = bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ massege: 'Неверный пароль, попробуйте снова' })
        }


        } catch(e) {
            res.status(500)
                .json({ massege: 'Что-то пошло не так! Попробуйте снова.' });
            console.log('Server Error: ', e.message);
        }
});

module.exports = router;
