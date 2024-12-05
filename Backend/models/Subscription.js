const promisePool = require('../config/db'); 

class Subscription {
  
  static async findByUserId(userId) {
    try {

      const query = 'SELECT * FROM Subscription WHERE user_id = ?';  

      const [rows] = await promisePool.query(query, [userId]);
    
      return rows;
    } catch (error) {
      console.error("Error fetching subscription:", error);
      throw error;
    }
  }
}

module.exports = Subscription;