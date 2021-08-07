const urlController = require('./urlController');

module.exports = (app) => {
    app.route('/encode').post(urlController.encodeUrl);
    app.route('/decode').post(urlController.decodeUrl);
    app.route('/:shorturl').get(urlController.redirectToUrl);
};
