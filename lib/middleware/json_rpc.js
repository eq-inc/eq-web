/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const util = require('util');


// Export module
module.exports = {
    /**
     * Return middleware function
     *
     * @returns {Function}
     */
    middleware: function () {
        return function (req, res, next) {
            req.body = req.body || {};
            res.body = res.body || {};

            const context = req.context,
                config = context.get('config'),
                logger = context.get('logger'),
                json_rpc = config.json_rpc || {},
                batch = Array.isArray(req.body),
                result_key = (200 === res.code) ? 'result' : 'error',
                request = (batch) ? req.body : [req.body],
                response = (batch) ? res.body : [res.body],
                json_rpc_version = json_rpc.version || '2.0';
            let result = Object.keys(response).map(function (key) {
                const data = {},
                    id = request[key].id;

                data.jsonrpc = json_rpc_version;
                data[result_key] = response[key];
                if (id) {
                    data.id = id;
                }

                return data;
            });

            if (json_rpc.strict) {
                result = result.filter(function (value) {
                    return !!value.id;
                });

                res.notification = (1 > result.length);
            }

            if (res.notification) {
                logger.info(JSON.stringify({
                    key: 'notify',
                    value: {
                        path: req.path,
                        status: res.status,
                        request: req.body,
                        response: res.body,
                        time: util.format('%d ms', Date.now() - req.start)
                    }
                }));
            } else {
                res.body = (batch) ? result : result[0];

                next();
            }
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
