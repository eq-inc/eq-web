/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Export module
module.exports = function () {
    return function (req, res, next) {
        if (req.session) {
            next();
        } else {
            const error = new Error('Unauthorized');
            error.code = 401;

            next(error);
        }
    };
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
