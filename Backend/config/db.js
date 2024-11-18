// require('dotenv').config(); 
// const mysql = require('mysql2');

// // Ensure the object for connection is formatted correctly
// const connection = mysql.createConnection({
//   user: process.env.DB_USER, 
//   host: process.env.DB_HOST,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.PORT,
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err.message);
//   } else {
//     console.log('Connected to the database');
//   }
// });

require('dotenv').config(); 
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  user: process.env.DB_USER, 
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT,
  waitForConnections: true,  // Allow new connections to wait for an available one
  connectionLimit: 10,       // Maximum number of connections to the pool
  queueLimit: 0              // No limit for the number of queued requests
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
