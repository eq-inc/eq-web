/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Export module
module.exports = {
    /**
     * Return middleware function
     *
     * @returns {Function}
     */
    middleware: function () {
        return function (req, res, next) {
            if (res.encrypt) {
                res.header('Content-Type', 'application/octet-stream');

                // Add initial vector header
                if (res.iv) {
                    res.header('X-Initial-Vector', res.iv.toString('base64'));
                }

                // Add auth tag header
                if (res.auth_tag) {
                    res.header('X-Auth-Tag', res.auth_tag.toString('base64'));
                }
            } else if (res.msgpack) {
                res.header('Content-Type', 'application/x-msgpack');
            } else {
                res.header('Content-Type', 'application/json; cahrset=UTF-8');
            }

            if (!req.id) {
                res.header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
                res.header('Expires', 'Thu, 01 Jan 1970 00:00:00 GMT');
            }

            res.status(res.code).end(res.body);

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
