const express = require('express');
const router = express.Router();
const { changeBalance } = require('../services/balanceService');

router
    .route('/')

    .put((req, res) => {
        changeBalance(req, res);
    });

module.exports = router;
