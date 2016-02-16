/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const msgpack = require('msgpack');


// Export module
module.exports = function () {
    return function (req, res, next) {
        try {
            req.body = JSON.parse(req.body);
        } catch (e) {
            if (e instanceof SyntaxError) {
                req.body = msgpack.unpack(req.body);
            } else {
                throw e;
            }
        }

        next();
    };
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
