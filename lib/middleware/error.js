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
     * @returns {Function}
     */
    middleware: function () {
        return function (error, req, res, next) {
            const result = web.error(error.message || 'Internal server error', error.code);

            res.code = result.code;
            res.body = result;

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
