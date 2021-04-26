const express = require('express');
const router = express.Router();

const { table } = require('../controllers/statisticsController')

router.get('/table',table)

module.exports = router;