const express = require('express');
const router = express.Router();
const { fetchBalance, updateBalance } = require('../services/balanceService');

router
    .route('/')

    .put((req, res) => {
        updateBalance(req, res);
    });

router
    .route('/:id')

    .get((req, res) => {
        fetchBalance(req, res);
    });

module.exports = router;
