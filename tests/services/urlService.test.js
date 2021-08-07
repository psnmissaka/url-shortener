const {
    generateShortLinkStr,
    generateShortUrl,
    getLongUrl,
} = require('../../src/services/urlService');

describe('urlService tests', () => {
    describe('generateShortLinkStr() function tests', () => {
        test('generates a short link successfully', () => {
            const shortLinkStr = generateShortLinkStr();
            expect(shortLinkStr.length).toBeDefined();
        });
    });

    describe('generateShortUrl() function tests', () => {
        test('successfully returns a valid short url', () => {
            const shortUrl = generateShortUrl('https://google.com');
            expect(shortUrl).toMatch(new RegExp('^http:\\/\\/short.est\\/'));
        });
    });

    describe('getLongUrl() function tests', () => {
        test('successfully get the long url from a existing short url', () => {
            const originalUrl = getLongUrl('rc41Wd');
            expect(originalUrl).toMatch(
                new RegExp(
                    'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
                ),
            );
        });

        test('get false value when short url id does not exist', () => {
            const originalUrl = getLongUrl('234');
            expect(originalUrl).toBeFalsy();
        });

        test('get false when given short url id is empty', () => {
            const originalUrl = getLongUrl();
            expect(originalUrl).toBeFalsy();
        });
    });
});
