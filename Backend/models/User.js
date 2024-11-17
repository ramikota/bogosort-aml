const connection = require('../config/db');

class User {
  // Create a new user
  static create({ username, password, role, postcode, city, country }, callback) {
    const query = `INSERT INTO User (username, password, role, postcode, city, country) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(query, [username, password, role, postcode, city, country], callback);
  }

  // Find user by username
  static findByUsername(username, callback) {
    const query = 'SELECT * FROM User WHERE username = ?';
    connection.query(query, [username], callback);
  }

  // Find user by ID
  static findById(id, callback) {
    const query = 'SELECT * FROM User WHERE id = ?';
    connection.query(query, [id], callback);
  }

  // Find all users (for accountant)
  static findAll(callback) {
    const query = 'SELECT * FROM User';
    connection.query(query, callback);
  }
}

module.exports = User;