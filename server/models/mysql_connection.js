const mysql =   require('mysql');
                require('dotenv').load();
const util = require('util');

const conn = mysql.createPool({
    host: process.env.VUE_APP_MYSQL_HOST,
    user: process.env.VUE_APP_MYSQL_USER,
    password: process.env.VUE_APP_MYSQL_PASS,
    database: process.env.VUE_APP_MYSQL_DB,
    port: 3307,
    connectionLimit: 10,
    insecureAuth: true
});

conn.getConnection(function(err) {
    if (err) {
        console.error('error connecting: ')
        return;
    }
    console.log('connected as id + connection thread id');
})

conn.query = util.promisify(conn.query) 

module.exports = conn;

// do i need to specify the database somewhere? 
