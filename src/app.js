const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');

const routes = require('./api/routes');
const { stream } = require('./config/logger');

const app = express();

// go to have to extra layer or security
app.use(helmet());
// enables compression
app.use(compression());

// express logging
// logging to console
app.use(morgan('short'));
// logging the combined output the logfiles
app.use(morgan('combined', { stream }));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

routes(app);

module.exports = app;
