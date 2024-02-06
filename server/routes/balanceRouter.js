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
     * /balance/{id}:
     *   get:
     *     summary: Balance retrieving.
     *     description: Balance retrieving by user's ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Numeric user ID.
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Fetch balance succeeded.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 balance:
     *                   type: integer
     *                   description: The user balance.
     *                   example: 482.99
     *                 message:
     *                   type: string
     *                   description: Message.
     *                   example: "fetch balance succeeded"
     *       404:
     *         description: Balance fetch terminated.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Message.
     *                   example: "balance fetch terminated"
     *                 cause:
     *                   type: string
     *                   description: Message.
     *                   example: "the user does not exist"
     */
    .get((req, res) => {
        fetchBalance(req, res);
    });

module.exports = router;
