import {DataTypes} from 'sequelize';

class IntegrationModel{
    constructor() {
    }
}

function integrationModel(sequelize) {
    const attributes = {
        integrationType: { type: DataTypes.STRING, allowNull: false},
        config: { type: DataTypes.TEXT, allowNull: false },
        isConfigured: { type: DataTypes.BOOLEAN, allowNull: false }
       
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

    return sequelize.define('Integration', attributes, options);
}

export {IntegrationModel,integrationModel};