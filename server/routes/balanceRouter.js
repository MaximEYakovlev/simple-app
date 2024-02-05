const express = require('express');
const router = express.Router();
const { fetchBalance, updateBalance } = require('../services/balanceService');

router
    .route('/')

    /**
    * @swagger
    * /balance:
    *   put:
    *     summary: Balance replenishment.
    *     description: Balance replenishment by user's ID.
    *     requestBody:
    *         required: true
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 userId:
    *                   type: string
    *                   description: User ID.
    *                   example: "7"
    *                 amount:
    *                   type: string
    *                   description: Amount.
    *                   example: "300" 
    *                 action:
    *                   type: object
    *                   properties:
    *                     type: 
    *                       type: string
    *                       description: Action type.
    *                       example: "replenish"
    */                         
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
    *         description: Balance.
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
    *       500:
    *         description: Server error.
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
