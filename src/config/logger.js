const winston = require('winston');

const logger = winston.createLogger({
    defaultMeta: { service: 'url-shortening-service' },
    transports: [
        new winston.transports.File({
            filename: './logs/combined.log',
            level: 'info',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),
    ],
});

const stream = {
    write: (message) => {
        logger.info(message);
    },
};

module.exports = {
    logger,
    stream,
};
