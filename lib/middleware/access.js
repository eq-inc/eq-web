/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const loggers = require('../logger');


// Export module
module.exports = function () {
    return function (req, res, next) {
        const logger = loggers.get('access');
        console.log(logger.info(req.body));

        next();
    };
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
