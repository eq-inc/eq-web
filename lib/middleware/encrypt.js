/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true, stupid: true */
'use strict';



// Export module
module.exports = {
    /**
     * Return middleware function
     *
     * @returns {Function}
     */
    middleware: function (utility) {
        return function (req, res, next) {
            if (!res.encrypt) {
                return next();
            }

            if (!req.key) {
                return next();
            }

            const iv = utility.crypto.iv(),
                encrypted = utility.crypto.encryptiv('aes-256-gcm', req.key, iv, res.body);
            res.iv = iv;
            res.body = encrypted.data;
            res.auth_tag = encrypted.tag;

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
