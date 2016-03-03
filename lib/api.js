/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const _ = require('lodash'),
    async = require('neo-async');
var list = {};


// Export module
module.exports = {

    /**
     * Define API
     *
     * @param {Object} api
     */
    define: function (api) {
        list = api;
    },


    /**
     * Call API
     *
     * @param {Object}   req
     * @param {Object}   body
     * @param {Function} callback
     */
    call: function(req, body, callback) {
        const self = this,
            method = _.snakeCase(body.method || ''),
            data = {data: body.data || {}},
            func = _.get(list, method);

        if (method && !func) {
            const error = new Error('Not Found');
            error.status = 404;

            throw error;
        }

        if (func) {
            req.context.call(func, data, callback);
        } else {
            const parallels = _.mapValues(body, function (parameter) {
                return function (done) {
                    self.call(req, parameter, done);
                };
            });

            async.parallel(parallels, callback);
        }
    }

};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
