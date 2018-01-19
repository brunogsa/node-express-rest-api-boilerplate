import http from 'http';
import Promise from 'bluebird';

import express from './services/express-wrapper';
import api from './api';
import configs from './configs';
import { globalLogger as log } from './services/logs';

const app = express(configs.api.root, api);
const server = http.createServer(app);

app.start = function (callback) {
  return new Promise((resolve, reject) => {
    const localhost = '0.0.0.0';

    server.listen(configs.api.port, localhost, () => {
      log.info(`API [${configs.env}] is listening on port ${configs.api.port}`);
      return resolve();
    });

  });
};

app.stop = function () {
  server.close();
  return Promise.resolve();
};

module.exports = app;
