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
      const result = await User.create({ username, password, address, postcode, city, country });
      res.status(201).json({ message: 'User registered successfully', userId: result.insertId });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error processing the request' });
    }
  }

  // User login
  static async login(req, res) {
    const { username, password } = req.body;
    try {
      const users = await User.findByUsername(username);
      if (users.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      const user = users[0];
      const isPasswordValid = await User.verifyPassword(user.password, password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generating JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Set the token in the cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        sameSite: 'Strict',
        maxAge: 3600000  // 1 hour expiration
      });
      res.status(200).json({ message: 'Login successful', userId: user.id, token });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Accountant login
  static async loginAccountant(req, res) {
    const { username, password } = req.body;

    try {
      const users = await User.findByUsernameAndRole(username, 'accountant');

      if (users.length === 0) {
        return res.status(404).json({ message: 'Accountant not found' });
      }
      const user = users[0];
      const isPasswordValid = await User.verifyPassword(user.password, password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
       res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        sameSite: 'Strict',
        maxAge: 3600000  
      });

      res.status(200).json({ message: 'Login successful' });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async logout(req, res) {
    try {
      // Clear the authentication cookie
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        sameSite: 'Strict',
        path: '/', 
      });
      res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error logging out' });
    }
  }
}

module.exports = UserController;