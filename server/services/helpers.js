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
            return {
                trueUser: true,
            };
        } else {
            return {
                trueUser: false,
                message: 'the user does not exist',
            };
        }
    } catch (error) {
        console.error(error);
    }
};

const checkBalance = async (userId, amount, t) => {
    try {
        const balance = await getBalance(userId, t);

        if (balance >= Number(amount)) {
            return {
                status: true,
            };
        } else {
            return {
                status: false,
                message: 'insufficient funds',
            };
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
        const { trueUser, message } = await isUser(userId, t);

        if (trueUser) {
            const currentBalance = await getBalance(userId, t);
            const updatedBalance = currentBalance + Number(amount);

            await changeBalance(userId, updatedBalance, t);

            return {
                status: true,
                message: 'replenish succeeded',
            };
        } else {
            return {
                message: 'replenish terminated',
                cause: message,
            };
        }
    } catch (error) {
        console.error(error);
    }
};

const withdraw = async (userId, amount, t) => {
    try {
        const { trueUser, message } = await isUser(userId, t);

        if (trueUser) {
            const { status, message } = await checkBalance(userId, amount, t);

            if (status) {
                const currentBalance = await getBalance(userId, t);
                const updatedBalance = currentBalance - Number(amount);

                await changeBalance(userId, updatedBalance, t);

                return {
                    status: true,
                    message: 'withdraw succeeded',
                };
            } else {
                return {
                    status: false,
                    message: 'withdraw terminated',
                    cause: message,
                };
            }
        } else {
            return {
                status: false,
                message: 'withdraw terminated',
                cause: message,
            };
        }
    } catch (error) {
        console.error(error);
    }
};

const transfer = async (senderId, amount, action, t) => {
    const { recipientId } = action;

    try {
        const sender = await isUser(senderId, t);
        const recipient = await isUser(recipientId, t);

        if (sender.trueUser && recipient.trueUser) {
            const { status, cause } = await withdraw(senderId, amount, t);

            if (status) {
                await replenish(recipientId, amount, t);

                return {
                    status: true,
                    message: 'transfer succeeded',
                };
            } else {
                return {
                    status: false,
                    message: 'transfer terminated',
                    cause: cause,
                };
            }
        } else {
            return {
                status: false,
                message: 'transfer terminated',
                cause: sender.message
                    ? `sender/${sender.message}`
                    : `recipient/${recipient.message}`,
            };
        }
    } catch (error) {
        console.error(error);
    }
};

const sendResponse = (res, response, action) => {
    switch (action.type) {
        case 'replenish':
            if (response.status) {
                res.status(200).json({
                    message: response.message,
                });
            } else {
                res.json({
                    message: response.message,
                    cause: response.cause,
                });
            }
            break;
        case 'withdraw':
            if (response.status) {
                res.status(200).json({
                    message: response.message,
                });
            } else {
                res.json({
                    message: response.message,
                    cause: response.cause,
                });
            }
            break;
        case 'transfer':
            if (response.status) {
                res.status(200).json({
                    message: response.message,
                });
            } else {
                res.json({
                    message: response.message,
                    cause: response.cause,
                });
            }
            break;
        default:
            res.json({
                message: 'there is no such action type',
            });
    }
};

module.exports = {
    changeBalance,
    checkBalance,
    getBalance,
    isUser,
    replenish,
    sendResponse,
    transfer,
    withdraw,
};
