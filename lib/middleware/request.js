/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const _ = require('lodash'),
    accepts = require('accepts'),
    types = {
        json: 'application/json',
        msgpack: 'application/x-msgpack'
    };


// Export module
module.exports = {
    /**
     * Return middleware function
     *
     * @returns {Function}
     */
    middleware: function () {
        return function (req, res, next) {
            const accept = accepts(req),
                type = accept.type(_.values(types));

            req.auth_tag = req.get('X-Auth-Tag');
            res.msgpack = (types.msgpack === type);
            res.encrypt = req.get('X-Encrypt');
            req.id = req.get('X-Request-ID');

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
