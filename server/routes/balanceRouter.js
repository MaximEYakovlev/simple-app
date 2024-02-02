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

    /**
     * @swagger
     * /balance:
     *   get:
     *     summary: Balance retrieving
     *     description: Retrieving balance by user's ID
     */
    .get((req, res) => {
        fetchBalance(req, res);
    });

module.exports = router;
