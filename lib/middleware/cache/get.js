/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const async = require('neo-async'),
    web = require('../../');


// Export module
module.exports = {
    /**
     * Setup module
     */
    setup: function () {},

    /**
     * Return middleware function
     *
     * @returns {Function}
     */
    middleware: function () {
        const cache = web.cache;

        return function (req, res, next) {
            if (!req.id) {
                return next();
            }

            async.waterfall([
                // Get cache data
                cache.get.bind(cache, req.id),

                // Set cache data
                function (result, done) {
                    if (result) {
                        res.cache = true;
                        res.code = result.code;
                        res.body = result.data;
                    }

                    done();
                }
            ], next);
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
