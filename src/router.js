const express = require("express");

const {
    reports
} = require('./controllers');

const router = express.Router();

router.use('/reports', reports);

module.exports = router;