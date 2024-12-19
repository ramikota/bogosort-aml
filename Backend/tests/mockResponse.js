const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnThis(); // Allows chaining
    res.json = jest.fn().mockReturnThis(); // Allows chaining
    return res;
  };
  
  module.exports = { mockResponse };