import winston, { Logger, format } from 'winston';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';
const defaultFormatter = isProd ? format.json() : format.prettyPrint();

const transports = [
  isProd
    ? new winston.transports.File({
      filename: `${require(path.join(process.cwd(), 'package.json')).name}_combined.log`
    })
    : new winston.transports.Console()
];

const rootLogger = winston.createLogger({
  transports,
  format: format.combine(
    format.timestamp(),
    defaultFormatter
  )
});

function createLogger(namespace: string): Logger {
  return rootLogger.child({
    ns: namespace
  });
}

export {
  rootLogger as logger,
  createLogger
}