const { Account } = require('../db/models');

const checkBalance = async (userId, amount, t) => {
    try {
        const balance = await getBalance(userId, t);

        if (balance >= Number(amount)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
    }
};

const changeBalance = async (userId, updatedBalance, t) => {
    try {
        await Account.update(
            { balance: updatedBalance },
            { where: { userId } },
            { transaction: t }
        );
    } catch (error) {
        console.error(error);
    }
};

const getBalance = async (userId, t) => {
    try {
        const accountData = await Account.findOne(
            { where: { userId } },
            { transaction: t }
        );
        const {
            dataValues: { balance },
        } = accountData;

        return Number(balance);
    } catch (error) {
        console.error(error);
    }
};

const replenish = async (userId, amount, t) => {
    const currentBalance = await getBalance(userId, t);
    const updatedBalance = currentBalance + Number(amount);

    await changeBalance(userId, updatedBalance, t);
};

const withdraw = async (userId, amount, t) => {
    const transactionConfirmation = await checkBalance(userId, amount, t);

    if (transactionConfirmation) {
        const currentBalance = await getBalance(userId, t);
        const updatedBalance = currentBalance - Number(amount);

        await changeBalance(userId, updatedBalance, t);
    } else {
        console.log({
            message: 'the balance cannot be less than zero',
        });
    }
};

const transfer = async (userId, amount, action, t) => {
    const transactionConfirmation = await checkBalance(userId, amount, t);

    if (transactionConfirmation) {
        await withdraw(userId, amount, t);
    } else {
        console.log({
            message: 'the balance cannot be less than zero',
        });
        return;
    }

    const { recipientId } = action;

    await replenish(recipientId, amount, t);
};

module.exports = {
    checkBalance,
    changeBalance,
    getBalance,
    replenish,
    withdraw,
    transfer,
};
