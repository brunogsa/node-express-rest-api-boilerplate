import fs from 'fs';
import app from '../../src/app';

const testFiles = fs.readdirSync(__dirname).filter(filename => filename !== 'index.js');

describe('API Tests', () => {
  describe('App starts successfully', () => {
    it('Ok', () => {
      return app.start();
    });
  });

  testFiles.forEach(file => {
    require(`./${file}`);
  });

  describe('App stops successfully', () => {
    it('Ok', () => {
      return app.stop();
    });
  });
});
