const Borrow = require('../models/Borrow'); // Import the Borrow model
const BranchMedia = require('../models/branchMedia');

class BorrowController {
    static async borrowMedia(req, res) {
        const { userId, mediaId, branchId } = req.body;
       
        
        try {
        
          
          // Check if the media exists in the branch and is available
          const result = await BranchMedia.checkMediaInBranch(branchId, mediaId);
          
          if (!result || !result[0]) {
            return res.status(404).json({ message: 'Media not found in the branch' });
          }
      
          // Ensure there is stock available for borrowing
          if (result[0].available_count > 0) {
            // Step 1: Call the borrowMedia method to create a borrow record and update availability
            const borrowResult = await Borrow.borrowMedia({ userId, mediaId, branchId });
      
            // If borrow operation is successful
            res.status(200).json({ message: 'Item borrowed successfully' });
            
          } else {
            res.status(400).json({ message: 'Item not available at this branch' });
          }
      } catch (err) {
          console.error('Error borrowing media:', err.message);
          res.status(500).json({ message: 'Error borrowing media1' });
        }
   }

   static async getBorrowedMedia(req, res) {
    const userId = req.query.userId; 

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    try {
      const borrowedMedia = await Borrow.findByUserIdWithMedia(userId);

      if (borrowedMedia.length === 0) {
        return res.status(200).json({ borrowedItems: [] }); // Always return an array
      }
      res.status(200).json({ borrowedItems: borrowedMedia });
    } catch (error) {
      console.error('Error fetching borrowed media:', error);
      res.status(500).json({ message: 'Error fetching borrowed media.' });
    }
  }
}

module.exports = BorrowController;