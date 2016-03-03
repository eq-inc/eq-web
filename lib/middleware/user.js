/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true, stupid: true */
'use strict';



// Export module
module.exports = function (database) {
    return function (req, res, next) {
        const context = req.context,
            session = req.session || {};
        if (!session.id) {
            return next();
        }

        const user = database.suite('user').create(session.id);
        context.set('user', user);

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
