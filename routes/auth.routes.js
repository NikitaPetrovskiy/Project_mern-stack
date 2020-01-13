const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = Router();

//api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const candidate = await User.findOne({ email });

        if(candidate) {
            return res.status(400)
                .json('Пользователь с таким email уже существует!');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword });

        await user.save();
        res.status(201).json({ message: 'Пользователь создан' });
    } catch(e) {
        res.status(500)
            .json('Что-то пошло не так! Попробуйте снова.');
        console.log('Server Error: ', e.message);
    }
});

//api/auth/login
router.post('/login', async (req, res) => {
    try {

    } catch(e) {
        
    }
});

module.exports = router;
