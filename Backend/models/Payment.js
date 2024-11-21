const connection = require('../config/db');

class Payment {
  // Create a new payment
  static create({ userId, amount, paymentDate }, callback) {
    const query = `INSERT INTO Payment (user_id, amount, payment_date) 
                   VALUES (?, ?, ?)`;
    connection.query(query, [userId, amount, paymentDate], callback);
  }

  // Find payments by user ID
  static findByUserId(userId, callback) {
    const query = 'SELECT * FROM Payment WHERE user_id = ?';
    connection.query(query, [userId], callback);
  }

  // Find all payments (for accountant)
  static findAll(callback) {
    const query = 'SELECT * FROM Payment';
    connection.query(query, callback);
  }
}

module.exports = Payment;