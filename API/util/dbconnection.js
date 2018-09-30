const mysql = require('mysql');
const dbConnectionConfig = require("../../../probability-formula-one/dbConnectionConfig").dbConnectionConfig;

let db = mysql.createConnection(dbConnectionConfig);
db.connect();

module.exports = db;