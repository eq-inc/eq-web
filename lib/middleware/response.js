/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const msgpack = require('msgpack'),
    utility = require('karmia-utility');


// Export module
module.exports = function () {
    return function (req, res, next) {
        res.body = (res.msgpack) ? msgpack.pack(res.body) : JSON.stringify(res.body);

        if (res.encrypt) {
            res.header('Content-Type', 'application/octet-stream');
        } else if (res.msgpack) {
            res.header('Content-Type', 'application/x-msgpack');
        } else {
            res.header('Content-Type', 'application/json; cahrset=UTF-8');
        }

        res.status(res.code).end(res.body);

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
