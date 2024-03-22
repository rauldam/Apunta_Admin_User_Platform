import getConfig from 'next/config';
import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import {userModel}  from '../../Models/User.js';
import {customerModel}  from '../../Models/Customer.js';
import {courtModel}  from '../../Models/Court.js';
import {deviceModel}  from '../../Models/Device.js';
import {integrationModel}  from '../../Models/Integration.js';
import {matchModel}  from '../../Models/Match.js';
import {planModel}  from '../../Models/Plan.js';
import {transactionModel}  from '../../Models/Transaction.js';

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

    db.User.hasOne(db.Customer);
    db.Customer.hasMany(db.Court);
    db.Plan.hasMany(db.Court);
    db.Court.hasMany(db.Match);
    db.Court.hasMany(db.Transaction);
    db.Customer.hasMany(db.Transaction);
    db.Customer.hasMany(db.Integration);
    db.Device.belongsTo(db.Court);
    // sync all models with database
    await sequelize.sync({ alter: true });

    db.initialized = true;
}