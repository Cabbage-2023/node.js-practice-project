const mysql = require('mysql2');

const connectionPool = mysql.createPool({
  host: 'localhost', 
  port: 3306,
  database: 'coderhub',
  user: 'root',
  password: '1234',
  connectionLimit: 10,
});

module.exports = connectionPool.promise();