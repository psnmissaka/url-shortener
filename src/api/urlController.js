const { generateShortUrl, getLongUrl } = require('../services/urlService');
const errorMessages = require('../constants/errorMessages');
const { shortUrlMap } = require('../../sampleData/data');

// returns the encoded short url link given a original link
const encodeUrl = (req, res) => {
    const body = {
        shortLink: generateShortUrl(req.body.url),
    };
    res.json(body).status(200);
};

// decodes the short url link and returns the original link
const decodeUrl = (req, res) => {
    const shortUrlId = req.body.shortUrl.split('/')[3];

    if (!getLongUrl(shortUrlId)) {
        res.status(404).send(errorMessages.SHORT_URL_404);
        return;
    }

    res.json({ decodedUrl: getLongUrl(shortUrlId) }).status(200);
};

// lists the count and all the current url mappings
const getAllUrls = (req, res) => {
    const count = shortUrlMap.size;
    const urls = [];

    shortUrlMap.forEach((value, key) => {
        const urlObject = {};
        urlObject[key] = value.url;
        urls.push(urlObject);
    });

    res.json({
        count,
        urls,
    });
};

// redirects the user to the original link once hit with short link
const redirectToUrl = (req, res) => {
    const shortUrlId = req.params.shorturl;
    const originalUrl = getLongUrl(shortUrlId);

    if (!originalUrl) {
        res.status(404).send(errorMessages.SHORT_URL_404);
        return;
    }

    res.redirect(originalUrl);
};

module.exports = {
    encodeUrl,
    decodeUrl,
    getAllUrls,
    redirectToUrl,
};
