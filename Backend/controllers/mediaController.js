const Media = require('../models/Media');
const BranchMedia = require('../models/branchMedia');


class MediaController {
 
  static async getHomeMedia(req, res) {
    try {
      const media = await Media.findAll(); 
      const shuffledMedia = media.sort(() => Math.random() - 0.5); 
      const limitedMedia = shuffledMedia.slice(0, 100); 
      res.status(200).json(limitedMedia);
    } catch (err) {
    
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
    
      res.status(500).json({ message: 'Error fetching media details' });
    }
  }
  
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