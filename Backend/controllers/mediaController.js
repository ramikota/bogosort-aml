const Media = require('../models/Media');
const BranchMedia = require('../models/branchMedia');

class MediaController {
  // Fetch media for the homepage
  static async getHomeMedia(req, res) {
    try {
      const media = await Media.findAll(); // Fetch all media
      const shuffledMedia = media.sort(() => Math.random() - 0.5); // Shuffle the media randomly
      const limitedMedia = shuffledMedia.slice(0, 100); 
      res.status(200).json(limitedMedia);
    } catch (err) {
      console.error('Error fetching homepage media:', err.message);
      res.status(500).json({ message: 'Error fetching homepage media' });
    }
  }

  static async getMediaDetails(req, res) {
    const mediaId = req.params.mediaId;
  
    try {
      const mediaDetails = await Media.findById(mediaId);
      const availability = await BranchMedia.getAvailabilityByMedia(mediaId);

  
      res.status(200).json({ mediaDetails, availability });
    } catch (err) {
      console.error('Error fetching media details:', err.message);
      res.status(500).json({ message: 'Error fetching media details' });
    }
  }

  // Borrow media
  static async borrowMedia(req, res) {
    const { mediaId, branchId } = req.body;

    try {
      const result = await BranchMedia.checkMediaInBranch(branchId, mediaId); 

      if (result[0].availableCount > 0) {
        await BranchMedia.updateMediaAvailability(branchId, mediaId, -1); 

        res.status(200).json({ message: 'Item borrowed successfully' });
      } else {
        res.status(400).json({ message: 'Item not available at this branch' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error borrowing media' });
    }
  }

  // Search media by title or author
  static async searchMedia(req, res) {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    try {
      const results = await Media.search(query);
      res.status(200).json(results);
    } catch (err) {
      console.error('Error searching media:', err.message);
      res.status(500).json({ message: 'Error searching media' });
    }
  }
}

module.exports = MediaController;