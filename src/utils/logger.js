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
  const textMessage = typeof message === 'object'
    ? JSON.stringify(message)
    : message;

  console[level](`[${date}] [${tag}]: ${textMessage}`);
}

export function expressLogger(req, res, next) {
  logger('ROUTER', `${req.method} route ${req.originalUrl}`);
  next();
}
