const connection = require('../config/db');

class Borrow {
  // Create a new borrow record
  static create({ userId, mediaId }, callback) {
    const query = `INSERT INTO Borrow (user_id, media_id) VALUES (?, ?)`;
    connection.query(query, [userId, mediaId], callback);
  }

  // Find all borrow records by user ID
  static findByUserId(userId, callback) {
    const query = 'SELECT * FROM Borrow WHERE user_id = ?';
    connection.query(query, [userId], callback);
  }

  // Update return date of a borrowed media
  static updateReturnDate(borrowId, callback) {
    const query = 'UPDATE Borrow SET return_date = NOW() WHERE id = ?';
    connection.query(query, [borrowId], callback);
  }
}

module.exports = Borrow;