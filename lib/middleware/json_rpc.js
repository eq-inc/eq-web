/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const api = require('../api');


// Export module
module.exports = {
    /**
     * Return middleware function
     *
     * @returns {Function}
     */
    middleware: function () {
        return function (req, res, next) {
            const result = {},
                body = req.body || {},
                context = req.context,
                key = (200 === res.code) ? 'result' : 'error',
                config = context.get('config');
            result.jsonrpc = (config.json_rpc && config.json_rpc.version) || '2.0';
            result[key] = res.body;
            if (body.id) {
                result.id = body.id;
            }

            res.body = result;

            next();
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
