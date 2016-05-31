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
    middleware: function (config, utility) {
        const encrypt = config.encrypt || {},
            algorithm = encrypt.algorithm || 'aes-256-gcm';

        return function (req, res, next) {
            if (!req.key) {
                return next();
            }

            const data = {};
            data.data = req.body;
            if (req.auth_tag) {
                data.tag = req.auth_tag;
            }

            req.encrypt = true;
            if (req.iv) {
                req.body = utility.crypto.decryptiv(algorithm, req.key, req.iv, data);
            } else {
                req.body = utility.crypto.decrypt(algorithm, req.key, data);
            }

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
