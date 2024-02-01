const { Account, User } = require('../db/models');

const createNewUser = async (req, res) => {
    const { firstName, lastName, email, birthDate, accountNumber, balance } =
        req.body;

    try {
        const newUserData = await User.create(
            {
                firstName,
                lastName,
                email,
                birthDate,
                Account: {
                    accountNumber,
                    balance,
                },
            },
            {
                include: [
                    {
                        association: User.Account,
                    },
                ],
            }
        );
        res.status(200).json(newUserData);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await User.destroy({
            where: {
                id,
            },
        });
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getAllUsers = async (res) => {
    try {
        const user = await User.findAll({
            order: [['firstName', 'ASC']],
            include: Account,
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { createNewUser, deleteUser, getAllUsers };
