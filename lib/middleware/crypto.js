/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true, stupid: true */
'use strict';


// Export module
module.exports = function (ecdh, utility) {
    return function (req, res, next) {
        const context = req.context,
            user = context.get('user');
        if (!user) {
            return next();
        }

        user.get(function (error, result) {
            if (error) {
                return next(error);
            }

            const secret = ecdh.computeSecret(new Buffer(result.public_key, 'base64'));
            req.key = utility.crypto.sha256(secret);

            next();
        });
    };
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
