const mysql =   require('mysql');
                require('dotenv').load();
const util = require('util');

const conn = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    // add?: port: ....,
    connectionLimit: 10,
    insecureAuth: true
});

conn.query = util.promisify(conn.query) 

module.exports = conn;
