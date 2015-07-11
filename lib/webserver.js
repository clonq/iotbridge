var debug = require('debug')('iotbridge:webserver'),
    pkg = require('../package.json'),
    express = require('express'),
    app = module.exports.app = express(),
    cors = require('cors'),
    errorHandler = require('errorhandler'),
    bodyParser = require('body-parser'),
    path = require('path'),
    http = require('http').Server(app),
    router = require('./webrouter');

module.exports = {
    start: function(opts) {
        app.set('x-powered-by', false);
        app.set('port', opts.port);
        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'html');
        app.use(cors());
        app.use(bodyParser.json());
        app.use(express.static('./public'));
        app.use(function (req, res, next) {
            res.status(404).sendFile("404.html", { root: path.join(__dirname, "./public"), title: "404 - page not found" });
        });
        app.use(function (err, req, res, next) {
            res.status(500).sendFile("500.html", { root: path.join(__dirname, "./public"), title: "500 - server error" });
        });
        app.use(errorHandler({ dumpExceptions: true, showStack: true }));
        app.use('/', router);
        http.listen(app.get('port'), function () {
            debug('web server v. ' + pkg.version + ' started on port', opts.port);
        });
    }
}
