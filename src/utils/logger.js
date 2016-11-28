export function logger(tag, message, level = 'log') {
  const date = new Date().toISOString();
  const msg = `[${date}] [${tag}]: ${message}`;

  console[level](msg);
}

export function expressLogger(req, res, next) {
  logger('ROUTER', `${req.method} route ${req.originalUrl}`);
  next();
}
