import {DataTypes} from 'sequelize';

class PlanModel {
    constructor() {
    }
}


function planModel(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        specs: { type: DataTypes.TEXT, allowNull: false, defaultValue:'{"specs":[]}' },
        price: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: '0' },
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

    return sequelize.define('Plan', attributes, options);
}

export {PlanModel,planModel};