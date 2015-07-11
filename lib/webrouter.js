var debug = require('debug')('iotbridge:webrouter'),
    express = require('express'),
    router = express.Router();

module.exports = router;

router.get('/', function (req, res, next) {
    debug('todo: implement root handler');
    next();
});
