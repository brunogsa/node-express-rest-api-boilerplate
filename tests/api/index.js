import fs from 'fs';
import app from '../../src/app';

const testFiles = fs.readdirSync(__dirname).filter(filename => filename !== 'index.js');

describe('API Tests', () => {
  describe('Application', () => {
    it('Starts successfully', () => {
      return app.start();
    });

    it('Stops successfully', () => {
      return app.stop();
    });
  });

  testFiles.sort().forEach(file => {
    require(`./${file}`);
  });
});
