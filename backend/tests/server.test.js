jest.mock('../src/models', () => ({
    sequelize: {
      authenticate: jest.fn().mockResolvedValue(),
      sync: jest.fn().mockResolvedValue()
    }
  }));
  
  jest.mock('../src/app', () => ({
    listen: jest.fn((port, host, cb) => cb?.())
  }));
  
  describe('server.js entrypoint', () => {
    it('should initialize without throwing', () => {
      require('../src/server'); 
    });
  });