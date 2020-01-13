const { Router } = require('express');
const router = Router();

//api/auth/register
router.post('/register', (req, res) => {
    try {

    } catch(e) {
        res.status(500)
            .json('Что-то пошло не так! Попробуйте снова.');
        console.log('Server Error: ', e.message);
    }
});

//api/auth/login
router.post('/login', (req, res) => {
    try {

    } catch(e) {
        
    }
});

module.exports = router;
