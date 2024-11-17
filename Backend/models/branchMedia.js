const connection = require('../config/db');

// BranchMedia model
const BranchMedia = {
  // Method to get availability of a specific media across branches
  getAvailabilityByMedia: (mediaId, callback) => {
    const query = `
      SELECT 
        b.name AS branch_name, 
        bm.availableCount
      FROM 
        BranchMedia bm
      JOIN 
        Branch b ON bm.branchId = b.id
      WHERE 
        bm.mediaId = ?
      ORDER BY 
        b.name;
    `;
    connection.query(query, [mediaId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  },

  // Method to add media to a branch (initial availability)
  addMediaToBranch: (branchId, mediaId, availableCount, callback) => {
    const query = `
      INSERT INTO BranchMedia (branchId, mediaId, availableCount)
      VALUES (?, ?, ?)
    `;
    connection.query(query, [branchId, mediaId, availableCount], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  },

  // Method to update the availability count when borrowing or returning
  updateMediaAvailability: (branchId, mediaId, count, callback) => {
    const query = `
      UPDATE BranchMedia
      SET availableCount = availableCount + ?
      WHERE branchId = ? AND mediaId = ?
    `;
    connection.query(query, [count, branchId, mediaId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  },

  // Method to check if a media item exists in a branch
  checkMediaInBranch: (branchId, mediaId, callback) => {
    const query = `
      SELECT availableCount
      FROM BranchMedia
      WHERE branchId = ? AND mediaId = ?
    `;
    connection.query(query, [branchId, mediaId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  }
};

module.exports = BranchMedia;