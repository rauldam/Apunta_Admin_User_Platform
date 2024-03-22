import {DataTypes} from 'sequelize';

class TransactionModel {
    constructor() {
    }
}

function transactionModel(sequelize) {
    const attributes = {
        date: { type: DataTypes.DATE, allowNull: false},
        invoiceName: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false },
        total: { type: DataTypes.DOUBLE, allowNull: false },
        vat: { type: DataTypes.INTEGER, allowNull: false },
        products: { type: DataTypes.TEXT, allowNull: false}
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('Transaction', attributes, options);
}

export {TransactionModel, transactionModel};