const urlshorten = require('../routes/urlShortener');

module.exports = function (app) {

    app.use('/', urlshorten);

}