/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const web = require('../');


// Export module
module.exports = {
    /**
     * Return middleware function
     *
     * @param   {Object} logger
     * @returns {Function}
     */
    middleware: function (logger) {
        return function (error, req, res, next) {
            const result = web.error(error);
            res.code = res.code || result.code;
            res.body = res.body || result;
            logger.error(JSON.stringify({
                status: res.code,
                path: req.path,
                data: req.body,
                result: res.body
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
