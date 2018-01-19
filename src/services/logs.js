import util from 'util';
import bunyan from 'bunyan';
import configs from '../configs';

const ALLOWED_LOG_LEVELS = {
  TRACE: 'trace',
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  FATAL: 'fatal'
};

function createConsoleStream(logLevel) {
  if (!logLevel) throw new Error('Mandatory argument "logLevel" is null');

  return {
    stream: process.stdout,
    level: logLevel
  };
}

function validateLogLevel(logLevel) {
  const allowedLogLevels = Object.values(ALLOWED_LOG_LEVELS);
  const isAllowedLevel = allowedLogLevels.find(allowedLevel => logLevel === allowedLevel);

  if (!isAllowedLevel) throw new Error(`Provided an unknown log level "${logLevel}"`);
}

/**
 * Creates a logger to be used.
 * At least one stream (log or file) must be specified.
 *
 * @param {object} params
 * @param {string} params.name
 * @param {string} [params.consoleLogLevel=warn] trace, debug, info, warn, error, fatal
 *
 * @throws {Error} If mandatory information is missing or invalid data was provided
 *
 * @return {Logger}
 */
function createLogger(params = {}) {
  params.consoleLogLevel = params.consoleLogLevel || 'warn';

  if (!params.name) throw new Error('Mandatory argument "name" is null');
  validateLogLevel(params.consoleLogLevel);

  const logger = bunyan.createLogger({
    name: params.name,

    streams: [
      createConsoleStream(params.consoleLogLevel)
    ]
  });

  return logger;
}

function prettifyObj(obj) {
  try {
    // This causes error on circular objects
    return JSON.stringify(obj, null, 2);

  } catch (error) {
    // This don't, but it's uglier. Using it as a fallback
    return util.inspect(obj);
  }
}

const globalLogger = createLogger({
  name: configs.appName,
  consoleLogLevel: configs.logLevel
});

const requestLoggerMiddleware = function (req, res, next) {
  globalLogger.info({ requestId: req.id }, `Entering on route ${req.method} ${req.url} ...`);
  globalLogger.debug({ requestId: req.id }, `req.params: ${prettifyObj(req.params)}`);
  globalLogger.debug({ requestId: req.id }, `req.body: ${prettifyObj(req.params)}`);

  next();
};

/*
 * By default, express doesn't expose res.body for security reasons.
 * This middleware expose it ONLY on 5XX scenarios for debug purposes.
 */
const exposeErrorResponsesMiddleware = function (req, res, next) {
  res.json = function (obj) {
    const isErrorResponse = res.statusCode >= 500;
    if (isErrorResponse) res.body = obj;

    res.type('json');
    res.send(
      JSON.stringify(obj)
    );
  };

  next();
};

const responseLoggerMiddleware = function (req, res, next) {
  const isErrorResponse = res.statusCode >= 500;

  const levelToLog = isErrorResponse ? 'error' : 'info';
  globalLogger[levelToLog]({ requestId: req.id }, `Leaving route with ${res.statusCode}`);

  if (isErrorResponse) {
    globalLogger.error({ requestId: req.id }, `Errors: ${prettifyObj(res.body)}`);
  }

  next();
};

export {
  createLogger,
  globalLogger,
  prettifyObj,
  requestLoggerMiddleware,
  exposeErrorResponsesMiddleware,
  responseLoggerMiddleware
};
