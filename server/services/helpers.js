const { Account, User } = require('../db/models');

const isUser = async (userId, t) => {
    try {
        const user = await User.findOne(
            {
                where: {
                    id: userId,
                },
            },
            { transaction: t }
        );

        if (user) {
            return true;
        } else {
            console.log({
                message: 'the user does not exist',
            });

            return false;
        }
    } catch (error) {
        console.error(error);
    }
};

const checkBalance = async (userId, amount, t) => {
    try {
        const balance = await getBalance(userId, t);

        if (balance >= Number(amount)) {
            return true;
        } else {
            console.log({
                message: 'insufficient funds',
            });

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
            {
                where: {
                    userId,
                },
            },
            { transaction: t }
        );
    } catch (error) {
        console.error(error);
    }
};

const getBalance = async (userId, t) => {
    try {
        const accountData = await Account.findOne(
            {
                where: {
                    userId,
                },
            },
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
    try {
        const trueUser = await isUser(userId, t);

        if (trueUser) {
            const currentBalance = await getBalance(userId, t);
            const updatedBalance = currentBalance + Number(amount);

            await changeBalance(userId, updatedBalance, t);
        } else {
            console.log({
                message: 'replenish terminated',
            });

            return;
        }
    } catch (error) {
        console.error(error);
    }
};

const withdraw = async (userId, amount, t) => {
    try {
        const trueUser = await isUser(userId, t);

        if (trueUser) {
            const transactionConfirmation = await checkBalance(
                userId,
                amount,
                t
            );

            if (transactionConfirmation) {
                const currentBalance = await getBalance(userId, t);
                const updatedBalance = currentBalance - Number(amount);

                await changeBalance(userId, updatedBalance, t);

                return { status: true };
            } else {
                console.log({
                    message: 'withdraw terminated',
                });

                return { status: false };
            }
        } else {
            console.log({
                message: 'withdraw terminated',
            });

            return;
        }
    } catch (error) {
        console.error(error);
    }
};

const transfer = async (senderId, amount, action, t) => {
    const { recipientId } = action;

    try {
        const trueSender = await isUser(senderId, t);
        const trueRecipient = await isUser(recipientId, t);

        if (trueSender && trueRecipient) {
            const { status } = await withdraw(senderId, amount, t);

            if (status) {
                await replenish(recipientId, amount, t);
            } else {
                console.log({
                    message: 'transfer terminated',
                });

                return;
            }
        } else {
            console.log({
                message: 'transfer terminated',
            });

            return;
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    checkBalance,
    changeBalance,
    getBalance,
    replenish,
    withdraw,
    transfer,
};
