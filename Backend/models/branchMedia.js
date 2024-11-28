const promisePool = require('../config/db'); // Importing the promisePool

const BranchMedia = {
  // Get availability of a specific media across branches
  getAvailabilityByMedia: async (mediaId) => {
    const query = `
      SELECT 
      b.id AS branch_id, 
      b.name AS branch_name, 
      bm.available_count
    FROM 
      BranchMedia bm
    JOIN 
      Branch b ON bm.branch_id = b.id
    WHERE 
      bm.media_id = ?
    ORDER BY 
      b.name;
  `;
    try {
      const [results] = await promisePool.query(query, [mediaId]);
      return results;
    } catch (err) {
      throw new Error('Error fetching availability: ' + err.message);
    }
  },

  // Check if a media item exists in a branch
  checkMediaInBranch: async (branchId, mediaId) => {
    const query = `
  SELECT * FROM BranchMedia 
  WHERE branch_id = ? AND media_id = ?
`;
    try {
      const [results] = await promisePool.query(query, [branchId, mediaId]);
      console.log("Query results:", results); // Log the results for debugging
      return results;
    } catch (err) {
      throw new Error('Error checking media in branch: ' + err.message);
    }
  }
};

module.exports = BranchMedia;