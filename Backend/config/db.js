require('dotenv').config(); 
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  user: process.env.DB_USER, 
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT,
  waitForConnections: true,  
  connectionLimit: 10,      
  queueLimit: 0            
});


// Export the pool as a promise-based interface
const promisePool = pool.promise();  
promisePool.getConnection()
  .then(connection => {
    console.log('Connected to the database');
    connection.release();  // Release the connection back to the pool
  })
  .catch(err => {
    console.error('Error connecting to database:', err.message);
  });
  console.log('Using database:', process.env.DB_NAME);
module.exports = promisePool;
