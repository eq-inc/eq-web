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
    middleware: function (utility) {
        return function (req, res, next) {
            const accept = accepts(req),
                type = accept.type(_.values(types)),
                iv = req.get('X-Initial-Vector'),
                auth_tag = req.get('X-Auth-Tag');

            req.id = req.get('X-Request-ID');
            req.auth_tag = auth_tag && Buffer.from(auth_tag, 'base64');
            req.iv = iv && Buffer.from(iv, 'base64');
            req.user_agent = req.get('User-Agent');
            res.encrypt = utility.string.toBoolean(req.get('X-Encrypt'));
            res.msgpack = (types.msgpack === type);

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
