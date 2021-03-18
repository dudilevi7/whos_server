const express = require('express');
const router = express.Router();

const { table,sendResult } = require('../controllers/statisticsController')

router.get('/table',table)
router.post('/send',sendResult)

module.exports = router;