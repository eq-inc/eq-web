/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const msgpack = require('msgpack');


// Export module
module.exports = function () {
    return function (req, res) {
        res.body = (res.msgpack) ? msgpack.pack(res.body) : JSON.stringify(res.body);

        if (res.encrypt) {
            res.header('application/octet-stream');
        } else {
            res.header((res.msgpack) ? 'application/x-msgpack' : 'application/json; charset=UTF-8');
        }

        res.status(res.code).end(res.body);
    };
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
