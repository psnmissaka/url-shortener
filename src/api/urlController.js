const { generateShortUrl, getLongUrl } = require('../services/urlService');
const {
    validateEncodeBody,
    validateDecodeBody,
} = require('../validators/requestBodyValidator');
const errorMessages = require('../constants/errorMessages');
const { logger } = require('../config/logger');

// returns the encoded short url link given a original link
const encodeUrl = (req, res) => {
    try {
        validateEncodeBody(req.body);
    } catch (e) {
        res.status(400).send({ error: e.message });
        return;
    }

    const body = {
        shortLink: generateShortUrl(req.body.url),
    };
    logger.info(`URL generated ${body.shortLink}`);
    res.json(body).status(200);
};

// decodes the short url link and returns the original link
const decodeUrl = (req, res) => {
    try {
        validateDecodeBody(req.body);
    } catch (e) {
        res.status(400).send({ error: e.message });
        return;
    }

    const shortUrlId = req.body.shortUrl.split('/')[3];

    if (!getLongUrl(shortUrlId)) {
        res.status(404).send({ error: errorMessages.SHORT_URL_404 });
        return;
    }

    res.json({ decodedUrl: getLongUrl(shortUrlId) }).status(200);
};

// redirects the user to the original link once hit with short link
const redirectToUrl = (req, res) => {
    const shortUrlId = req.params.shorturl;
    const originalUrl = getLongUrl(shortUrlId);

    if (!originalUrl) {
        res.status(404).send({ error: errorMessages.SHORT_URL_404 });
        return;
    }

    res.redirect(originalUrl);
};

module.exports = {
    encodeUrl,
    decodeUrl,
    redirectToUrl,
};
