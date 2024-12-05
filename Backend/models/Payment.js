const promisePool = require('../config/db');

class Payment {
  // Create a new payment
  static async create({ userId, amount, paymentDate }) {
    const query = `INSERT INTO Payment (user_id, amount, payment_date) 
                   VALUES (?, ?, ?)`;
    try {
      const [result] = await promisePool.query(query, [userId, amount, paymentDate]);
      return result;  
    } catch (err) {
      throw new Error('Error creating payment: ' + err.message);
    }
  }

  // Find payments by user ID
  static async findByUserId(userId) {
    const query = 'SELECT * FROM Payment WHERE user_id = ?';
    try {
      const [payments] = await promisePool.query(query, [userId]);
      return payments; 
    } catch (err) {
      throw new Error('Error finding payments by user ID: ' + err.message);
    }
  }

  // Find all payments (for accountant)
  static async findAll() {
    const query = 'SELECT * FROM Payment';
    try {
      const [payments] = await promisePool.query(query);
      return payments; 
    } catch (err) {
      throw new Error('Error fetching all payments: ' + err.message);
    }
  }
}

module.exports = Payment;