/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Export module
module.exports = function () {
    return function (req, res, next) {
        if (res.encrypt) {
            res.header('Content-Type', 'application/octet-stream');
            res.header('X-Auth-Tag', res.tag);
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
