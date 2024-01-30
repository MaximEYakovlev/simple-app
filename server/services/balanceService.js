const { sequelize } = require('../db/models');
const { checkBalance, getBalance, updateBalance } = require('./helpers');

const changeBalance = async (req, res) => {
    const { id, amount, action } = req.body;

    try {
        await sequelize.transaction(async (t) => {
            const currentBalance = await getBalance(id, t);
            let updatedBalance;

            if (action === 'replenish') {
                updatedBalance = currentBalance + amount;

                updateBalance(id, updatedBalance, t);

                res.sendStatus(200);
            } else if (action === 'withdraw') {
                const transactionConfirm = await checkBalance(id, amount, t);

                if (transactionConfirm) {
                    updatedBalance = currentBalance - amount;

                    updateBalance(id, updatedBalance, t);

                    res.sendStatus(200);
                } else {
                    res.json({
                        message: 'the balance cannot be less than zero',
                    });
                }
            }
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { changeBalance };
