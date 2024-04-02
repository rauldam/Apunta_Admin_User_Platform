import getConfig from 'next/config';
import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import {userModel}  from '../../models/User.js';
import {customerModel}  from '../../models/Customer.js';
import {courtModel}  from '../../models/Court.js';
import {deviceModel}  from '../../models/Device.js';
import {integrationModel}  from '../../models/Integration.js';
import {matchModel}  from '../../models/Match.js';
import {planModel}  from '../../models/Plan.js';
import {transactionModel}  from '../../models/Transaction.js';
import {courtsplansModel}  from '../../models/CourtsPlans.js';

const { serverRuntimeConfig } = getConfig();

export const db = {
    initialized: false,
    initialize
};

// initialize db and models, called on first api request from /helpers/api/api-handler.js
async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = userModel(sequelize);
    db.Customer = customerModel(sequelize);
    db.Court = courtModel(sequelize);
    db.Plan = planModel(sequelize);
    db.Match = matchModel(sequelize);
    db.Transaction = transactionModel(sequelize);
    db.Integration = integrationModel(sequelize);
    db.Device = deviceModel(sequelize);
    db.CourtsPlans = courtsplansModel(sequelize);



    db.User.hasOne(db.Customer);
    db.Customer.hasMany(db.Court);

    db.Plan.belongsToMany(db.Court, {through: db.CourtsPlans});
    db.Court.belongsToMany(db.Plan, {through: db.CourtsPlans});
    db.Court.hasMany(db.Match);
    db.Court.hasMany(db.Transaction);
    db.Customer.hasMany(db.Transaction);
    db.Customer.hasMany(db.Integration);
    db.Device.belongsTo(db.Court);

    // sync all models with database
    await sequelize.sync({ alter: true });

    db.initialized = true;
}
