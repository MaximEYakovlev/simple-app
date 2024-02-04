const { sequelize } = require('../db/models');
const {
    isUser,
    checkBalance,
    getBalance,
    replenish,
    withdraw,
} = require('../services/helpers/balanceHelpers');

describe('user is in the database', () => {
    test('response contains the object: { trueUser: true }', async () => {
        await sequelize.transaction(async (t) => {
            const response = await isUser(7, t);
            expect(response).toStrictEqual({ trueUser: true });
        });
    });

    test('response contains the object: { trueUser: false }', async () => {
        await sequelize.transaction(async (t) => {
            const response = await isUser(1, t);
            expect(response).toStrictEqual({
                trueUser: false,
                message: 'the user does not exist',
            });
        });
    });
});

describe('balance >= amount', () => {
    test('response contains the object: { status: true }', async () => {
        await sequelize.transaction(async (t) => {
            const response = await checkBalance(7, 40.54, t);
            expect(response).toStrictEqual({ status: true });
        });
    });

    test('response contains the object: { status: false }', async () => {
        await sequelize.transaction(async (t) => {
            const status = await checkBalance(7, 118.43, t);
            expect(status).toStrictEqual({
                status: false,
                message: 'insufficient funds',
            });
        });
    });
});

describe('returns balance', () => {
    test('must return balance', async () => {
        await sequelize.transaction(async (t) => {
            const balance = await getBalance(7, t);
            expect(balance).toBe(99.0);
        });
    });
});

describe('balance replenishment', () => {
    test('response contains the object: { status: true }', async () => {
        await sequelize.transaction(async (t) => {
            const response = await replenish(7, 506.99, t);
            expect(response).toStrictEqual({
                status: true,
                message: 'replenish succeeded',
            });
        });
    });

    test('response contains the object: { message: `replenish terminated` }', async () => {
        await sequelize.transaction(async (t) => {
            const response = await replenish(1, 390.99, t);
            expect(response).toStrictEqual({
                message: 'replenish terminated',
                cause: 'the user does not exist',
            });
        });
    });
});

describe('withdrawal from account', () => {
    test('response contains the object: { status: true }', async () => {
        await sequelize.transaction(async (t) => {
            const response = await withdraw(7, 119.0, t);
            expect(response).toStrictEqual({
                status: true,
                message: 'withdraw succeeded',
            });
        });
    });

    test('response contains the object: { status: false }', async () => {
        await sequelize.transaction(async (t) => {
            const response = await withdraw(1, 119.0, t);
            expect(response).toStrictEqual({
                status: false,
                message: 'withdraw terminated',
                cause: 'the user does not exist',
            });
        });
    });

    test('response contains the object: { status: false }', async () => {
        await sequelize.transaction(async (t) => {
            const response = await withdraw(7, 119000000.0, t);
            expect(response).toStrictEqual({
                status: false,
                message: 'withdraw terminated',
                cause: 'insufficient funds',
            });
        });
    });
});
