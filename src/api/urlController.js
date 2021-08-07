const validator = require('validator');
const { generateShortUrl, getLongUrl } = require('../services/urlService');
const errorMessages = require('../constants/errorMessages');

// returns the encoded short url link given a original link
const encodeUrl = (req, res) => {
    if (!validator.isURL(req.body.url)) {
        res.status(400).send({ error: errorMessages.INVALID_URL_400 });
        return;
    }

    const body = {
        shortLink: generateShortUrl(req.body.url),
    };
    res.json(body).status(200);
};

// decodes the short url link and returns the original link
const decodeUrl = (req, res) => {
    if (!validator.isURL(req.body.shortUrl)) {
        res.status(400).send({ error: errorMessages.INVALID_URL_400 });
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
