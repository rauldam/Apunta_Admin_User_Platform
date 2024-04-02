import {DataTypes} from 'sequelize';

class CourtsPlans {
    constructor() {
    }
}

function courtsplansModel(sequelize) {
    const attributes = {

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

    return sequelize.define('CourtsPlans', attributes, options);
}

export {CourtsPlans,courtsplansModel};
