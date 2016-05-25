/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const authenticate = require('../../auth');


// Export module
module.exports = {
    /**
     * Return middleware function
     *
     * @returns {Function}
     */
    middleware: function (strategy, options) {
        options = options || {};
        const digest_authenticate = authenticate(strategy, options);

        return digest_authenticate.middleware();
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
