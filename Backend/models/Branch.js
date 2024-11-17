const connection = require('../config/db');

class Branch {
  // Find all branches
  static findAll(callback) {
    const query = 'SELECT * FROM Branch';
    connection.query(query, callback);
  }

  // Find branch by ID
  static findById(branchId, callback) {
    const query = 'SELECT * FROM Branch WHERE id = ?';
    connection.query(query, [branchId], callback);
  }

  // Update an existing branch
  static update(branchId, { name, address, email }, callback) {
    const query = `
      UPDATE Branch 
      SET name = ?, address = ?, email = ? 
      WHERE id = ?
    `;
    connection.query(query, [name, address, email, branchId], callback);
  }
}

module.exports = Branch;