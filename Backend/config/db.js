require('dotenv').config(); 
const mysql = require('mysql2');

// Ensure the object for connection is formatted correctly
const connection = mysql.createConnection({
  user: process.env.DB_USER, 
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the database');
  }
});