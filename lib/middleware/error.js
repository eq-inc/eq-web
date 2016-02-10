/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



/**
 * Get HTTP status code by message
 *
 * @param   {string} message
 * @returns {number}
 */
function get_status_code(message) {
    if ('Bad request' === message) {
        return 400;
    }

    if ('Unauthorized' === message) {
        return 401;
    }

    if ('Payment required' === message) {
        return 402;
    }

    if ('Forbidden' === message) {
        return 403;
    }

    if ('Not found' === message) {
        return 404;
    }

    return 500;
}


// Export module
module.exports = function () {
    return function (error, req, res, next) {
        const result = {
            status: error.status,
            message: error.message || 'Internal server error'
        };
        result.status = result.status || get_status_code(result.message);

        res.code = result.status;
        res.body = result;

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
