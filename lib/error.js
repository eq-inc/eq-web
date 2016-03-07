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


// Variables
const _ = require('lodash');


// Export module
module.exports = function (message, code) {
    if (_.isObject(message)) {
        code = code || message.code;
        message = message.message;
    }

    const error = new Error(message);
    error.code = code || get_status_code(code);

    return error;
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
