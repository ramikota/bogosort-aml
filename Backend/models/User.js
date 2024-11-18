// const connection = require('../config/db');

// console.log(connection);
// class User {
//   // Create a new user
//   static create({ username, password, role, postcode, city, country }, callback) {
//     const query = `INSERT INTO User (username, password, role, postcode, city, country) 
//                    VALUES (?, ?, ?, ?, ?, ?)`;
//     connection.query(query, [username, password, role, postcode, city, country], callback);
//   }

//   // Find user by username
//   static findByUsername(username, callback) {
//     connection.query('SELECT * FROM User WHERE username = ?', [username], callback);
//   }


//   // Find all users (for accountant)
//   static findAll(callback) {
//     const query = 'SELECT * FROM User';
//     connection.query(query, callback);
//   }
// }

// module.exports = User;

const connection = require('../config/db'); // Importing the promise-based pool

class User {
  // Create a new user
  static async create({ username, password, role, postcode, city, country }) {
    const query = `INSERT INTO User (username, password, role, postcode, city, country) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    try {
      const [result] = await connection.query(query, [username, password, role, postcode, city, country]);
      return result;
    } catch (err) {
      throw new Error('Error creating user: ' + err.message);
    }
  }

  // Find user by username
  static async findByUsername(username) {
    const query = 'SELECT * FROM User WHERE username = ?';
    try {
      const [users] = await connection.query(query, [username]);
      return users;
    } catch (err) {
      throw new Error('Error finding user by username: ' + err.message);
    }
  }

  // Find all users (for accountant)
  static async findAll() {
    const query = 'SELECT * FROM User';
    try {
      const [users] = await connection.query(query);
      return users;
    } catch (err) {
      throw new Error('Error fetching all users: ' + err.message);
    }
  }
}

module.exports = User;