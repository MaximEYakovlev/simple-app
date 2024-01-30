'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
        static associate(models) {
            Account.belongsTo(models.User, {
                foreignKey: 'userId',
            });
        }
    }
    Account.init(
        {
            accountNumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            },
            balance: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: 'Account',
        }
    );
    return Account;
};
