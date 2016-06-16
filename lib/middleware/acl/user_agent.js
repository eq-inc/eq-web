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
    middleware: function (config) {
        const user_agent = config.user_agent || '',
            regexp = (user_agent instanceof RegExp) ? user_agent : new RegExp(user_agent);

        return function (req, res, next) {
            if (regexp.test(req.user_agent)) {
                return next();
            }

            const error = new Error('Forbidden');
            error.code = 403;

            next(error);
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
