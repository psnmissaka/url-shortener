const express = require('express');
const morgan = require('morgan');

const port = 3000;
const app = express();

app.use(morgan('dev'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const shortUrls = {};

app.post('/encode', (req, res) => {
    const { url } = req.body;
    let number = Math.floor(Math.random() * 36000000000);

    const c = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let hashStr = '';
    while (number > 0) {
        hashStr = c[number % 62] + hashStr;
        number = Math.floor(number / 62);
    }

    shortUrls[hashStr] = url;

    const body = {
        shortLink: `http://short.est/${hashStr}`,
    };
    res.json(body).status(200);
});

app.post('/decode', (req, res) => {
    const shortUrlId = req.body.shortUrl.split('/')[3];

    if (shortUrls[shortUrlId]) {
        res.json({ decodedUrl: shortUrls[shortUrlId] }).status(200);
        return;
    }
    res.status(404).send('Sorry, the short URL does not exist');
});

app.get('/all', (req, res) => {
    const count = Object.keys(shortUrls).length;
    res.json({
        count,
        shortUrls,
    });
});

app.listen(port, () => {
    console.log(`URL Shortener service listening at http://localhost:${port}`);
});
