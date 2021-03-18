const express = require('express');
const router = express.Router();

const { signIn , register } = require('../controllers/userController')

router.post('/register',register)


router.post('/signin',signIn)

module.exports = router;