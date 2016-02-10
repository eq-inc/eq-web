/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const accepts = require('accepts'),
    types = ['application/json', 'application/x-msgpack'];


// Export module
module.exports = function () {
    return function (req, res, next) {
        const accept = accepts(req),
            type = accept.type(types);
        res.msgpack = ('application/x-msgpack' === type);
        res.encrypt = req.get('X-Encrypt');

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
