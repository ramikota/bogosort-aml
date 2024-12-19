require('dotenv').config(); 
const mysql = require('mysql2');

const pool = mysql.createPool({
  user: process.env.DB_USER, 
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT,
  waitForConnections: true,  
  connectionLimit: 10,      
  queueLimit: 0   ,        
  charset: 'utf8mb4' 
});

const promisePool = pool.promise();  
promisePool.getConnection()
  .then(connection => {
    console.log('Connected to the database');
    connection.release();  
  })
  .catch(err => {
    console.error('Error connecting to database:', err.message);
  });
module.exports = promisePool;
