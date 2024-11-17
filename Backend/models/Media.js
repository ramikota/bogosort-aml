const connection = require('../config/db');

class Media {

  // Find media by ID
  static findById(mediaId, callback) {
    const query = 'SELECT * FROM Media WHERE id = ?';
    connection.query(query, [mediaId], callback);
  }

  // Find all media
  static findAll(callback) {
    const query = 'SELECT * FROM Media';
    connection.query(query, callback);
  }

  // Update availability status of a media item
  static updateAvailability(mediaId, availability, callback) {
    const query = 'UPDATE Media SET availability = ? WHERE id = ?';
    connection.query(query, [availability, mediaId], callback);
  }
}

module.exports = Media;