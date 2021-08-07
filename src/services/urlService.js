const { shortUrlMap } = require('../../sampleData/data');

// generates a base62 based short link string based on a random number generated
const generateShortLinkStr = () => {
    let randomNumber = Math.floor(Math.random() * 36000000000);
    const base62Charset =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    let hashStr = '';
    while (randomNumber > 0) {
        hashStr = base62Charset[randomNumber % 62] + hashStr;
        randomNumber = Math.floor(randomNumber / 62);
    }

    return hashStr;
};

// given a long url, returns a short url
const generateShortUrl = (url) => {
    let hashStr = generateShortLinkStr();
    while (shortUrlMap.get(hashStr)) {
        hashStr = generateShortLinkStr();
    }

    shortUrlMap.set(hashStr, { url, createdAt: new Date() });

    return `http://short.est/${hashStr}`;
};

const getLongUrl = (shortUrlId) =>
    shortUrlMap.get(shortUrlId) ? shortUrlMap.get(shortUrlId).url : false;

module.exports = {
    generateShortLinkStr,
    generateShortUrl,
    getLongUrl,
};
