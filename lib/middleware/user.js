/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true, stupid: true */
'use strict';



// Variables
const async = require('neo-async'),
    web = require('../');


// Export module
module.exports = function () {
    return function (req, res, next) {
        const context = req.context,
            session = req.session || {};
        if (!session.id) {
            return next();
        }

        async.waterfall([
            // Create user context
            context.async(web.user.createContext, {user_id: session.id}),

            // Add to context
            function (user, done) {
                context.set('user', user);

                done();
            }
        ], next);
    };
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
