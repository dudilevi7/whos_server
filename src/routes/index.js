const express = require('express')
const router = express.Router()

const auth = require('./auth')
const questions = require('./questions')
const stats = require('./stats')

router.use('/auth', auth)
router.use('/questions', questions)
router.use('/stats', stats)

module.exports = router