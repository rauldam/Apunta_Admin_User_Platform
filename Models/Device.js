import {DataTypes} from 'sequelize';

class DeviceModel {
    constructor() {
    }
}

function deviceModel(sequelize) {
    const attributes = {
        type: { type: DataTypes.STRING, allowNull: false},
        brand: { type: DataTypes.STRING, allowNull: false },//defaultValue:'{"player1":"name","player2":"name","player3":"name","player4":"name"}' },
        reference: { type: DataTypes.STRING, allowNull: false },//defaultValue: '00:00:00' },
        version: { type: DataTypes.STRING, allowNull: false },//defaultValue: '{"uno": {"a": "0","b": "0","c": "0","d": "0","saque":"0","setActual":"0","setEquipoA":"0","setEquipoB":"0","ja1":"0","campo":"1","isTieBreak":"0"},"dos": {"a": "0","b": "0","c": "0","d": "0","saque":"0","setActual":"0","setEquipoA":"0","setEquipoB":"0","jb1":"0","campo":"1"}}'},
        ota: { type: DataTypes.TEXT, allowNull: false }
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

    return sequelize.define('Device', attributes, options);
}

export {DeviceModel,deviceModel};