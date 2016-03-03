/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const async = require('neo-async');


// Export module
module.exports = function (web) {
    const cache = web.cache;

    return function (req, res, next) {
        if (!req.id) {
            return next();
        }

        cache.set(req.id, res.body, next);
    };
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
