const morgan = require('morgan');
const winston = require('winston');

// Winston logger configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
});

// Morgan middleware with Winston
const loggingMiddleware = morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim()),
    },
});

module.exports = loggingMiddleware;
