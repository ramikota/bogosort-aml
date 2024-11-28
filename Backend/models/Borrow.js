const promisePool = require('../config/db'); // Your connection pool

class Borrow {


  // Create a new borrow record and update media availability in a transaction
  static async borrowMedia({ userId, mediaId, branchId }) {
    const queryInsertBorrow = `INSERT INTO Borrow (user_id, media_id, borrow_date) VALUES (?, ?, NOW())`;
    const queryUpdateAvailability = `
      UPDATE BranchMedia
      SET available_count = available_count - 1
      WHERE branch_id = ? AND media_id = ? AND available_count > 0
    `;

    const connection = await promisePool.getConnection(); // Get connection from pool
    try {
      // Begin transaction
      await connection.beginTransaction();

      // Step 1: Insert a borrow record
      const [insertResult] = await connection.query(queryInsertBorrow, [userId, mediaId]);

      // Step 2: Update the available count in BranchMedia
      const [updateResult] = await connection.query(queryUpdateAvailability, [branchId, mediaId]);

      // Check if the availability update was successful
      if (updateResult.affectedRows === 0) {
        // Rollback if the availability update fails (no rows affected)
        await connection.rollback();
        throw new Error('Failed to update media availability');
      }

      // Commit the transaction if both operations succeed
      await connection.commit();

      // Return success response
      return { message: 'Media borrowed successfully' };

    } catch (err) {
      // Rollback if anything goes wrong during the transaction
      await connection.rollback();
      console.error('Error during borrowing process:', err.message);
      throw new Error('Error borrowing media');
    } finally {
      // Always release the connection back to the pool
      connection.release();
    }
  }
  // Existing function to get borrowed items by userId
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
    const [rows] = await promisePool.query(query, [userId]); // Use promisePool instead of pool
    return rows;
  } catch (error) {
    console.error("Error fetching borrowed media:", error);
    throw error;
  }
}


}

module.exports = Borrow;