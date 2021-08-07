const express = require('express');
const router = express.Router();

const getQuestions = require('./get-questions')
const postQuestion = require('./post-question')

router.get('/get-questions', getQuestions);
router.post('/post-question', postQuestion);

module.exports = router