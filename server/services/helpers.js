const { Account } = require('../db/models');

const checkBalance = async (id, amount, t) => {
    try {
        const balance = await getBalance(id, t);

        if (balance >= amount) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const getBalance = async (id, t) => {
    try {
        const accountData = await Account.findOne(
            { where: { userId: id } },
            { transaction: t }
        );
        const {
            dataValues: { balance },
        } = accountData;

        return Number(balance);
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateBalance = async (id, updatedBalance, t) => {
    try {
        await Account.update(
            { balance: updatedBalance },
            { where: { userId: id } },
            { transaction: t }
        );
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { checkBalance, getBalance, updateBalance };
