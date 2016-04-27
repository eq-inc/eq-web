/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const strategy = require('passport-http'),
    passport = require('../../passport');


// Export module
module.exports = {
    /**
     * Setup module
     *
     * @param {object} config
     */
    setup: function (config) {
        passport.use(new strategy.DigestStrategy({qop: 'auth'},
            function (username, done) {
                if (config.digest.username === username) {
                    return done(null, username, config.digest.password);
                }

                done(null, false);
            }
        ));
    },

    /**
     * Return middleware function
     *
     * @returns {Function}
     */
    middleware: function () {
        return passport.authenticate('digest', {session: false});
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
