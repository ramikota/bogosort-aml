const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

class UserController {
  // Register a new user
  static async register(req, res) {
    const { username, password, address, postcode, city, country } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findByUsername(username);

      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create the user
      const result = await User.create({ username, password, address, postcode, city, country });
      res.status(201).json({ message: 'User registered successfully', userId: result.insertId });

    } catch (err) {
      return res.status(500).json({ message: 'Error processing the request' });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;
  
    try {
      // Find user by username
      const users = await User.findByUsername(username);
  
      if (users.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const user = users[0];
  
      // Check if password matches
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({ message: 'Login successful', token });
  
    } catch (err) {
      console.error(err); 
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async loginAccountant(req, res) {
    const { username, password } = req.body;
  
    try {
      // Find accountant by username and role
      const user = await User.findByUsernameAndRole(username, 'accountant');
    
      if (user.length === 0) {
        return res.status(404).json({ message: 'Accountant not found' });
      }
    
      const foundUser = user[0];
    
      // Check if password matches
      if (foundUser.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    
      // Generate JWT token
      const token = jwt.sign(
        { id: foundUser.id, username: foundUser.username, role: foundUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
    
      res.status(200).json({ message: 'Login successful', token });
    
    } catch (err) {
      console.error(err); 
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = UserController;