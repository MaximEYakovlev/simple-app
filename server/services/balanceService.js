const { sequelize } = require('../db/models');
const { sendResponse } = require('./helpers/responseHelpers');
const {
    getBalance,
    isUser,
    replenish,
    transfer,
    withdraw,
} = require('./helpers/balanceHelpers');

const updateBalance = async (req, res) => {
    const { userId, amount, action } = req.body;

    try {
        await sequelize.transaction(async (t) => {
            switch (action.type) {
                case 'replenish':
                    {
                        const response = await replenish(userId, amount, t);
                        sendResponse(res, response, action);
                    }
                    break;
                case 'withdraw':
                    {
                        const response = await withdraw(userId, amount, t);
                        sendResponse(res, response, action);
                    }
                    break;
                case 'transfer':
                    {
                        const response = await transfer(
                            userId,
                            amount,
                            action,
                            t
                        );
                        sendResponse(res, response, action);
                    }
                    break;
                default:
                    res.json({
                        message: 'there is no such action type',
                    });
            }
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

const fetchBalance = async (req, res) => {
    const { id } = req.params;

    try {
        await sequelize.transaction(async (t) => {
            const { trueUser, message } = await isUser(id, t);

            if (trueUser) {
                const userBalance = await getBalance(id, t);

                res.status(200).json({
                    balance: userBalance,
                    message: 'fetch balance succeeded',
                });
            } else {
                res.json({
                    message: 'balance fetch terminated',
                    cause: message,
                });
            }
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { fetchBalance, updateBalance };
