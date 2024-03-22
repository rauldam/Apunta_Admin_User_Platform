import { DataTypes } from 'sequelize';

class UserModel {
    constructor() {
    }
}
    function userModel(sequelize) {
        const attributes = {
            username: { type: DataTypes.STRING, allowNull: false },
            hash: { type: DataTypes.STRING, allowNull: false },
            firstName: { type: DataTypes.STRING, allowNull: false },
            lastName: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false },
            tmp_email: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
            active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
            isAdmin: { type: DataTypes.BOOLEAN, allowNull:false, defaultValue: false },
        };

        const options = {
            defaultScope: {
                // exclude password hash by default
                attributes: { exclude: ['hash'] }
            },
            scopes: {
                // include hash with this scope
                withHash: { attributes: {} },
                activeUsers: { where: { active: true }}
                }
            }

        return sequelize.define('User', attributes, options);
    }
export {UserModel,userModel};
