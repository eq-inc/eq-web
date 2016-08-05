/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const util = require('util'),
    loggers = require('../loggers');


// Export module
module.exports = {
    /**
     * Return middleware function
     *
     * @param   {Object} logger
     * @returns {Function}
     */
    middleware: function (logger) {
        return function (req, res, next) {
            logger.info(JSON.stringify({
                key: 'response',
                value: {
                    path: req.path,
                    status: res.status,
                    request: req.body,
                    response: res.body,
                    time: util.format('%d ms', Date.now() - req.start)
                }
            }));

            next();
        };
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
