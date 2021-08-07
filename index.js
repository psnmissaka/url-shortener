const express = require('express');
const morgan = require('morgan');

const routes = require('./src/api/routes');

const port = 3000;
const app = express();

app.use(morgan('dev'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

routes(app);

app.listen(port, () => {
    console.log(`URL Shortener service listening at http://localhost:${port}`);
});
