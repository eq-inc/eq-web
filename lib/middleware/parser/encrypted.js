/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true, stupid: true */
'use strict';



// Variables
const msgpack = require('msgpack');


// Export module
module.exports = {
    /**
     * Return middleware function
     *
     * @returns {Function}
     */
    middleware: function () {
        return function (req, res, next) {
            if (!req.encrypt) {
                return next();
            }

            try {
                req.body = JSON.parse(req.body);
            } catch (e) {
                if (e instanceof SyntaxError) {
                    req.body = msgpack.unpack(Buffer.from(req.body, 'base64'));
                } else {
                    throw e;
                }
            } finally {
                next();
            }
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
