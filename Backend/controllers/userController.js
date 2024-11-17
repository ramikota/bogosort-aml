const User = require('../models/User');

class UserController {
  // Register a new user
  static register(req, res) {
    const { username, password, role, postcode, city, country } = req.body;

    // Check if the user already exists
    User.findByUsername(username, (err, existingUser) => {
      if (err) {
        return res.status(500).json({ message: 'Error checking for user' });
      }

      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create the user
      User.create({ username, password, role, postcode, city, country }, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating user' });
        }
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
      });
    });
  }

  // Login a user
  static login(req, res) {
    const { username, password } = req.body;

    // Find the user by username
    User.findByUsername(username, (err, users) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching user' });
      }

      if (users.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = users[0];

      // Check if password matches
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.status(200).json({ message: 'Login successful', user });
    });
  }
}

module.exports = UserController;