const promisePool = require('../config/db');  

class Branch {
  // Find all branches
  static async findAll() {
    const query = 'SELECT * FROM Branch';
    try {
      const [rows] = await promisePool.query(query);
      return rows;
    } catch (error) {
      throw new Error(error.message); 
    }
  }

  // Find branch by ID
  static async findById(branchId) {
    const query = 'SELECT * FROM Branch WHERE id = ?';
    try {
      const [rows] = await promisePool.query(query, [branchId]);
      return rows;
    } catch (error) {
      throw new Error(error.message); 
    }
  }

  // Update an existing branch
  static async update(branchId, { name, address, email }) {
    const query = `
      UPDATE Branch 
      SET name = ?, address = ?, email = ? 
      WHERE id = ?
    `;
    try {
      const [result] = await promisePool.query(query, [name, address, email, branchId]);
      return result;
    } catch (error) {
      throw new Error(error.message); 
    }
  }
}

module.exports = Branch;