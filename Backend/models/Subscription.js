const connection = require('../config/db');

class Subscription {
  // Create a new subscription
  static create({ userId, startDate, endDate, active }, callback) {
    const query = `INSERT INTO Subscription (user_id, start_date, end_date, active) 
                   VALUES (?, ?, ?, ?)`;
    connection.query(query, [userId, startDate, endDate, active], callback);
  }

  // Find subscription by user ID
  static findByUserId(userId, callback) {
    const query = 'SELECT * FROM Subscription WHERE user_id = ?';
    connection.query(query, [userId], callback);
  }

  // Find all subscriptions (for accountant)
  static findAll(callback) {
    const query = 'SELECT * FROM Subscription';
    connection.query(query, callback);
  }
}

module.exports = Subscription;