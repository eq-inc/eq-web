/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const api = require('../api');


// Export module
module.exports = {
    /**
     * Return middleware function
     *
     * @returns {Function}
     */
    middleware: function () {
        return function (req, res, next) {
            if (res.body) {
                return next();
            }

            const body = req.body || {};
            api.call(req, body, function (error, result) {
                if (error) {
                    throw error;
                }

                res.code = 200;
                res.body = result;

                next();
            });
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
