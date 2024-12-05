const promisePool = require('../config/db'); 

class Borrow {

  static async borrowMedia({ userId, mediaId, branchId }) {
    const queryInsertBorrow = `INSERT INTO Borrow (user_id, media_id, borrow_date) VALUES (?, ?, NOW())`;
    const queryUpdateAvailability = `
      UPDATE BranchMedia
      SET available_count = available_count - 1
      WHERE branch_id = ? AND media_id = ? AND available_count > 0
    `;

    const connection = await promisePool.getConnection(); 
    try {
      
      await connection.beginTransaction();

      const [insertResult] = await connection.query(queryInsertBorrow, [userId, mediaId]);

      const [updateResult] = await connection.query(queryUpdateAvailability, [branchId, mediaId]);

      if (updateResult.affectedRows === 0) {
        await connection.rollback();
        throw new Error('Failed to update media availability');
      }
      await connection.commit();
  
      return { message: 'Media borrowed successfully' };

    } catch (err) {
      await connection.rollback();
      console.error('Error during borrowing process:', err.message);
      throw new Error('Error borrowing media');
    } finally {
      connection.release();
    }
  }
  static async findByUserId(userId) {
    const query = 'SELECT * FROM Borrow WHERE user_id = ?';
    try {
        const [results] = await promisePool.query(query, [userId]);
        return results;
    } catch (err) {
        throw new Error('Error fetching borrowed records');
    }
}
static async findByUserIdWithMedia(userId) {
  try {
    const query = `
      SELECT Borrow.id, Media.title, Media.author, Media.type, Borrow.borrow_date
      FROM Borrow
      JOIN Media ON Borrow.media_id = Media.id
      WHERE Borrow.user_id = ?
    `;
    const [rows] = await promisePool.query(query, [userId]);
    return rows;
  } catch (error) {
    console.error("Error fetching borrowed media:", error);
    throw error;
  }
}

}

module.exports = Borrow;