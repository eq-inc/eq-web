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

            req.api = true;
            api.call(req, req.body || {}, function (error, result) {
                if (error) {
                    return next(error);
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
