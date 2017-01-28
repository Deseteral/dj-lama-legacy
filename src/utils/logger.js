/* eslint-disable no-console */

let quiet = false;

export function loggerSetQuiet(isQuiet) {
  quiet = isQuiet;
}

export function logger(tag, message, level = 'log') {
  if (quiet) {
    return;
  }

  const date = new Date().toISOString();
  const msg = `[${date}] [${tag}]: ${message}`;

  console[level](msg);
}

export function expressLogger(req, res, next) {
  logger('ROUTER', `${req.method} route ${req.originalUrl}`);
  next();
}
