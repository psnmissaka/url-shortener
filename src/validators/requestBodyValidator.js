const validator = require('validator');
const errorMessages = require('../constants/errorMessages');

const validateEncodeBody = (requestBody) => {
    if (!requestBody.url) {
        throw new Error(errorMessages.REQUEST_PARAM_MISSING_400);
    }

    if (!validator.isURL(requestBody.url)) {
        throw new Error(errorMessages.INVALID_URL_400);
    }
};

const validateDecodeBody = (requestBody) => {
    if (!requestBody.shortUrl) {
        throw new Error(errorMessages.REQUEST_PARAM_MISSING_400);
    }

    if (!validator.isURL(requestBody.shortUrl)) {
        throw new Error(errorMessages.INVALID_URL_400);
    }
};

module.exports = {
    validateEncodeBody,
    validateDecodeBody,
};
