const { Router } = require('express');
const Link = require('../models/Link');
const router = Router();

router.post('/generate', async (req, res) => {
    try {

    } catch(e) {
        res.status(500)
            .json({ message: 'Что-то пошло не так! Попробуйте снова.' });
        console.log('Server Error: ', e.message);
    }
});

router.get('/', async (req, res) => {
    try {

    } catch(e) {
        res.status(500)
            .json({ message: 'Что-то пошло не так! Попробуйте снова.' });
        console.log('Server Error: ', e.message);
    }
});

router.get('/:id', async (req, res) => {
    try {

    } catch(e) {
        res.status(500)
            .json({ message: 'Что-то пошло не так! Попробуйте снова.' });
        console.log('Server Error: ', e.message);
    }
});

module.exports = router;
