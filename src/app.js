const compression = require('compression');
const express = require('express');
const morgan = require('morgan');

const routes = require('./api/routes');

const app = express();

app.use(compression());
app.use(morgan('dev'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

routes(app);

module.exports = app;
