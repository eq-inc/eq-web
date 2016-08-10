/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const _ = require('lodash');


// Export module
module.exports = {
    /**
     * Return middleware function
     *
     * @returns {Function}
     */
    middleware: function (config, utility) {
        const options = config.normalize || {},
            form = options.form || 'NFKC';

        return function (req, res, next) {
            if (req.body) {
                req.body = (function normalize(data) {
                    // String
                    if (_.isString(data)) {
                        return utility.string.normalize(data, form);
                    }

                    // Array or Object
                    if (_.isObject(data)) {
                        const map_function = Array.isArray(data) ? _.map : _.mapValues;

                        return map_function(data, function (value) {
                            return normalize(value);
                        });
                    }

                    return data;
                })(req.body);
            }

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
