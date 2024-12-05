const bcrypt = require('bcrypt');
const promisePool = require('../config/db'); 

class User {
  
  // Create a new user
  static async create({ username, password, address, postcode, city, country }) {
    const role = 'member';
    const hashedPassword = await bcrypt.hash(password, 12);  
    const query = `INSERT INTO User (username, password, role, address, postcode, city, country) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    try {
      const [result] = await promisePool.query(query, [username, hashedPassword, role, address, postcode, city, country]);
      return result;  
    } catch (err) {
      throw new Error('Error creating user: ' + err.message);
    }
  }

  // Find user by username
  static async findByUsername(username) {
    const query = 'SELECT * FROM User WHERE username = ?';
    try {
      const [users] = await promisePool.query(query, [username]);
      return users;  
    } catch (err) {
      throw new Error('Error finding user by username: ' + err.message);
    }
  }

  // Verify password for login
  static async verifyPassword(storedPassword, inputPassword) {
    try {
      const isValid = await bcrypt.compare(inputPassword, storedPassword);
      return isValid; 
    } catch (err) {
      throw new Error('Error verifying password: ' + err.message);
    }
  }

  // Find user by username and role
  static async findByUsernameAndRole(username, role) {
    const query = 'SELECT * FROM User WHERE username = ? AND role = ?';
    try {
      const [users] = await promisePool.query(query, [username, role]);
      return users;  
    } catch (err) {
      throw new Error('Error finding user by username and role: ' + err.message);
    }
  }

  // Find all users (for accountant)
  static async findAll() {
    const query = 'SELECT * FROM User';
    try {
      const [users] = await promisePool.query(query);
      return users; 
    } catch (err) {
      throw new Error('Error fetching all users: ' + err.message);
    }
  }
}

module.exports = User;