import { expect } from 'chai';
import openHttpRequest from 'axios';
import configs from '../../src/configs';

describe('GET /health', () => {

  it('Returns 200', () => {
    return openHttpRequest({
      method: 'get',
      baseURL: `http://0.0.0.0:${configs.api.port}${configs.api.root}`,
      url: '/health'

    }).then(response => {
      expect(response.status).to.be.equal(200);
    });
  });

});
