const express = require('express');
const multer = require('multer');
const register = require('./register');
const signIn = require('./sign-in');
const editProfile = require('./edit-profile')

const router = express.Router()
const upload = multer()

router.post('/register', upload.single('file') ,register)
router.post('/sign-in', signIn)
router.put('/edit-profile', upload.single('file'), editProfile)

module.exports = router