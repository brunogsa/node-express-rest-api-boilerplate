import request from 'supertest';
import app from '../../src/app';
import configs from '../../src/configs';

describe('GET /health', () => {

  it('Returns 200', () => {
    return request(app)
      .get(configs.api.root + '/health')
      .expect(200);
  });

});
