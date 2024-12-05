const promisePool = require('../config/db');  

class Media {

  // Search media by title or author
  static async search(query) {
    const searchQuery = `%${query}%`; 
    const sql = `
      SELECT * FROM Media 
      WHERE title LIKE ? OR author LIKE ?;
    `;
    try {
      const [results] = await promisePool.query(sql, [searchQuery, searchQuery]);
      return results;
    } catch (err) {
      throw new Error('Error executing search query: ' + err.message);
    }
  }

  // Find all media
  static async findAll() {
    const query = 'SELECT * FROM Media';
    try {
      const [results] = await promisePool.query(query);
      return results;
    } catch (err) {
      throw new Error('Error executing findAll query: ' + err.message);
    }
  }
   // Find media by ID
   static async findById(mediaId) {
    const query = 'SELECT * FROM Media WHERE id = ?';
    try {
      const [results] = await promisePool.query(query, [mediaId]);
      return results.length > 0 ? results[0] : null; 
    } catch (err) {
      throw new Error('Error executing findById query: ' + err.message);
    }
  }

  // Update availability status of a media item
  static async updateAvailability(mediaId, availability) {
    const query = 'UPDATE Media SET availability = ? WHERE id = ?';
    try {
      const [results] = await promisePool.query(query, [availability, mediaId]);
      return results;
    } catch (err) {
      throw new Error('Error executing updateAvailability query: ' + err.message);
    }
  }
}

module.exports = Media;