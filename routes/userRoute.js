const express = require('express');
const multer = require('multer');
const router = express.Router();

const { signIn , register } = require('../controllers/userController')

const upload = multer();
router.post('/register', upload.single('file') ,register)

router.post('/signin',signIn)

module.exports = router;