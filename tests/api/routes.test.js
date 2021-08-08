const supertest = require('supertest');
const app = require('../../src/app'); // Link to your server file

const request = supertest(app);

describe('API endpoint testing', () => {
    describe('testing endpoint /encode POST', () => {
        test('successfully get a short url', async () => {
            const response = await request
                .post('/encode')
                .send({ url: 'https://news.ycombinator.com/' })
                .set('Accept', 'application/json');
            expect(response.status).toBe(200);
            expect(response.body.shortLink).toMatch(
                new RegExp('^http:\\/\\/short.est\\/'),
            );
        });

        test('ger error response when empty URL is sent', async () => {
            const response = await request
                .post('/encode')
                .send({ url: '' })
                .set('Accept', 'application/json');
            expect(response.status).toBe(400);
            expect(response.body.error).toBe(
                'URL parameter is missing from the request body',
            );
        });

        test('ger error response when invalid URL pattern is sent', async () => {
            const response = await request
                .post('/encode')
                .send({ url: 'http://test.' })
                .set('Accept', 'application/json');
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('URL property pattern is invalid');
        });

        test('ger error response when no url is sent', async () => {
            const response = await request.post('/encode');
            expect(response.status).toBe(400);
            expect(response.body.error).toBe(
                'URL parameter is missing from the request body',
            );
        });
    });

    describe('testing endpoint /decode', () => {
        test('successfully get decoded URL from short URL', async () => {
            const response = await request
                .post('/decode')
                .send({ shortUrl: 'http://short.est/9ukmtO' })
                .set('Accept', 'application/json');
            expect(response.status).toBe(200);
            expect(response.body.decodedUrl).toEqual('https://google.com');
        });

        test('get error response when trying to decode url with none existing short url', async () => {
            const response = await request
                .post('/decode')
                .send({ shortUrl: 'http://short.est/9uk3a' })
                .set('Accept', 'application/json');
            expect(response.status).toBe(404);
        });

        test('get error response when trying to decode url with invalid url', async () => {
            const response = await request
                .post('/decode')
                .send({ shortUrl: 'http://sho' })
                .set('Accept', 'application/json');
            expect(response.status).toBe(400);
            expect(response.body.error).toEqual(
                'URL property pattern is invalid',
            );
        });

        test('ger error response when no short URL is sent', async () => {
            const response = await request.post('/decode');
            expect(response.status).toBe(400);
            expect(response.body.error).toEqual(
                'URL parameter is missing from the request body',
            );
        });
    });

    describe('testing redirect endpoint', () => {
        test('successfully get redirected to original URL from short URL', async () => {
            const response = await request.get('/9ukmtO');
            expect(response.status).toBe(302);
        });

        test('get error response when invoking endpoint with non existent short URL', async () => {
            const response = await request.get('/45da23');
            expect(response.status).toBe(404);
            expect(response.body.error).toEqual(
                'Sorry, the short URL does not exist',
            );
        });
    });
});
