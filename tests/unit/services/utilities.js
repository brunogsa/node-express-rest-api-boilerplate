import { expect } from 'chai';
import utilities from '../../../src/services/utilities';

describe('services/utilities.js', () => {
  describe('Method: generateUid', () => {

    it('Returns a non-empty string', () => {
      const uid = utilities.generateUid();
      expect(uid).to.not.be.null;
      expect(uid).to.not.be.undefined;
      expect(typeof uid).to.be.equal('string');
      expect(uid).to.not.be.empty;
    });

  });
});
