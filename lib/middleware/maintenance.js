/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';


const util = require('util'),
    request_ip = require('request-ip'),
    maintenance = require('../maintenance');


// Export module
module.exports = {
    /**
     * Return middleware function
     *
     * @returns {Function}
     */
    middleware: function (config, database) {
        const table = database.table('maintenance'),
            options = config.maintenance || {},
            allow_ip = options.allow_ip || [],
            allow_path = (options.allow_path || []).reduce(function (result, path) {
                result.push((path instanceof RegExp) ? path : new RegExp(util.format('^%s$', path)));

                return result;
            }, []);

        return function (req, res, next) {
            const ip = request_ip.getClientIp(req);
            if (-1 < allow_ip.indexOf(ip)) {
                return next();
            }

            const path = allow_path.every(function (value) {
                return !value.test(req.path);
            });
            if (!path) {
                return next();
            }

            req.context.call(maintenance.get, function (error, data) {
                if (error) {
                    return next(error);
                }

                if (data) {
                    const response = new Error();
                    response.code = 503;
                    response.message = table.fields.reduce(function (result, key) {
                        result[key] = data[key];

                        return result;
                    }, {});

                    return next(response);
                }

                next();
            });
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
