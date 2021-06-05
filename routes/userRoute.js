const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer();
const { signIn, register, editProfile } = require('../controllers/userController')

router.post('/register', upload.single('file') ,register)

router.post('/signin', signIn)
router.put('/edit-profile', upload.single('file'), editProfile)

module.exports = router;