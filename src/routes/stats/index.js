const express = require('express');
const router = express.Router();

const getTable = require('./get-table')

router.get('/get-table',getTable)

module.exports = router;