import {DataTypes} from 'sequelize';

class CustomerModel {
    constructor() {
    }
}
function customerModel(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: false },
        vat: { type: DataTypes.STRING, allowNull: false  },
        companyName: { type: DataTypes.STRING, allowNull: false }
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

    return sequelize.define('Customer', attributes, options);
}

export {CustomerModel,customerModel};