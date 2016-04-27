/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true, stupid: true */
'use strict';



// Export module
module.exports = {
    /**
     * Setup module
     */
    setup: function () {},

    /**
     * Return middleware function
     *
     * @returns {Function}
     */
    middleware: function (config, utility) {
        const encrypt = config.encrypt || {};

        return function (req, res, next) {
            if (!res.encrypt) {
                return next();
            }

            const context = req.context,
                user = context.get('user');
            if (!user) {
                return next();
            }

            const algorithm = encrypt.algorithm || 'aes-256-gcm',
                iv = req.ticket.substring(0, 12),
                result = utility.crypto.encryptiv(algorithm, req.key, iv, res.body);
            req.encrypt = true;
            res.body = result.data;
            res.tag = result.tag;

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
