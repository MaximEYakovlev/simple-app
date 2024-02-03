const { sequelize } = require('../db/models');
const {
    getBalance,
    isUser,
    replenish,
    transfer,
    withdraw,
} = require('./helpers');

const updateBalance = async (req, res) => {
    const { userId, amount, action } = req.body;

    try {
        await sequelize.transaction(async (t) => {
            switch (action.type) {
                case 'replenish':
                    await replenish(userId, amount, t);
                    res.sendStatus(200);
                    break;
                case 'withdraw':
                    await withdraw(userId, amount, t);
                    res.sendStatus(200);
                    break;
                case 'transfer':
                    await transfer(userId, amount, action, t);
                    res.sendStatus(200);
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
            const trueUser = await isUser(id, t);

            if (trueUser) {
                const userBalanse = await getBalance(id, t);

                res.status(200).json(userBalanse);
            } else {
                res.json({
                    message: 'fetch balance transaction terminated',
                });
            }
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { fetchBalance, updateBalance };
