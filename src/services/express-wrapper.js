import express from 'express';
import addRequestId from 'express-request-id';
import forceSSL from 'express-force-ssl';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import { errorHandler as bodyErrorHandler } from 'bodymen';
import { env } from '../configs';

import {
  globalLogger as log,
  requestLoggerMiddleware,
  exposeErrorResponsesMiddleware,
  responseLoggerMiddleware,

} from './logs';

process.on('unhandledRejection', (reason, p) => {
  log.fatal('Unhandled Rejection at:', p, 'reason:', reason);
});

export default (apiRoot, routes) => {
  const app = express();

  if (env === 'production') {
    app.set('forceSSLOptions', {
      enable301Redirects: false,
      trustXFPHeader: true,
    });

    app.use(forceSSL);
  }

  if (env === 'production' || env === 'development') {
    app.use(cors());
    app.use(compression());
  }

  app.use(addRequestId());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(requestLoggerMiddleware);
  app.use(exposeErrorResponsesMiddleware);
  app.use(apiRoot, routes);
  app.use(responseLoggerMiddleware);
  app.use(bodyErrorHandler());

  return app;
};
