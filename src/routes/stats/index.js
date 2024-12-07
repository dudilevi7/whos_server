const express = require('express');
const router = express.Router();

const getTable = require('./get-table');
const updateStats = require('./update-stats');

router.get('/get-table', getTable);
router.put('/', updateStats);

module.exports = router;