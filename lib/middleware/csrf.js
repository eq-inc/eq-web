/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const util = require('util');


// Export module
module.exports = {
    /**
     * Return middleware function
     *
     * @returns {Function}
     */
    middleware: function () {
        return function (req, res, next) {
            const from = req.get('X-From'),
                origin = req.get('Origin'),
                error = new Error('Bad request');
            error.code = 400;

            if (!from) {
                return next(error);
            }

            if (origin) {
                const regexp = new RegExp(util.format('^%s', origin), 'i');
                if (!regexp.test(from)) {
                    return next(error);
                }
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
