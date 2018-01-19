import path from 'path';
const dotenv = require('dotenv-safe');

dotenv.load({
  path: path.join(__dirname, '../.env'),
  sample: path.join(__dirname, '../.env_sample')
});

const configs = {
  env: process.env.NODE_ENV || 'development',

  api: {
    port: process.env.API_PORT || 3000,
    root: process.env.API_ROOT || '/api/v1'
  },

  appName: process.env.APP_NAME,
  logLevel: process.env.LOG_LEVEL || 'info'
};

export default configs;
