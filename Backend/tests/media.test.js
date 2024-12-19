
const BorrowController = require('/Users/habib/Documents/bogosort-aml/Backend/controllers/borrowController.js'); 
const BranchMedia = require('../models/branchMedia'); 
const Borrow = require('../models/Borrow'); 
const { mockResponse } = require('/Users/habib/Documents/bogosort-aml/Backend/tests/mockResponse.js');
// Mock the BranchMedia and Borrow models
jest.mock('../models/BranchMedia');
jest.mock('../models/Borrow');

describe('BorrowController.borrowMedia', () => {
  let req, res;

  // Set up mock request and response objects
  beforeEach(() => {
    req = {
      body: {
        userId: 17,
        mediaId: 101,
        branchId: 5,
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('should return 404 if media is not found in branch', async () => {
    // Mock BranchMedia to return null (media not found)
    BranchMedia.checkMediaInBranch.mockResolvedValueOnce(null);

    await BorrowController.borrowMedia(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Media not found in the branch' });
  });

  it('should return 400 if item is not available at the branch', async () => {
    // Mock BranchMedia to return media with available_count = 0
    BranchMedia.checkMediaInBranch.mockResolvedValueOnce([{ available_count: 0 }]);

    await BorrowController.borrowMedia(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Item not available at this branch' });
  });

  it('should borrow media if available', async () => {
    // Mock BranchMedia to return media with available_count > 0
    BranchMedia.checkMediaInBranch.mockResolvedValueOnce([{ available_count: 5 }]);
    // Mock Borrow.borrowMedia to simulate successful borrowing
    Borrow.borrowMedia.mockResolvedValueOnce(true);

    await BorrowController.borrowMedia(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Item borrowed successfully' });
  });

  it('should handle server errors gracefully', async () => {
    // Simulate a server error
    BranchMedia.checkMediaInBranch.mockRejectedValueOnce(new Error('Database error'));

    await BorrowController.borrowMedia(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error borrowing media1' });
  });
});