import {DataTypes} from 'sequelize';

class CourtModel {
    constructor() {
    }
}

function courtModel(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        mac: { type: DataTypes.STRING, allowNull: false, defaultValue: '00:00:00:00:00' },
        players: { type: DataTypes.TEXT, allowNull: false, },//defaultValue:'{"player1":"name","player2":"name","player3":"name","player4":"name"}' },
        time: { type: DataTypes.STRING, allowNull: false, },//defaultValue: '00:00:00' },
        score: { type: DataTypes.TEXT, allowNull: false, },//defaultValue: '{"uno": {"a": "0","b": "0","c": "0","d": "0","saque":"0","setActual":"0","setEquipoA":"0","setEquipoB":"0","ja1":"0","campo":"1","isTieBreak":"0"},"dos": {"a": "0","b": "0","c": "0","d": "0","saque":"0","setActual":"0","setEquipoA":"0","setEquipoB":"0","jb1":"0","campo":"1"}}'},
        isAvailable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
        isStarted: { type: DataTypes.BOOLEAN, allowNull: false , defaultValue: false },
        config: { type: DataTypes.TEXT, allowNull: false },
        ads: { type: DataTypes.TEXT, allowNull: false },
        matchTime: { type: DataTypes.INTEGER, allowNull: false },
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

    return sequelize.define('Court', attributes, options);
}

export {CourtModel,courtModel};