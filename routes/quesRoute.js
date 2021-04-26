const express = require('express');
const router = express.Router();

const { questions, enterQuestion } = require('../controllers/questionsController');

router.get('/get',questions);
router.post('/add',enterQuestion);

module.exports = router;