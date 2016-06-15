/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';


const request_ip = require('request-ip'),
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
            allow_ip = (config.maintenance && config.maintenance.allow_ip) || [];

        return function (req, res, next) {
            const ip = request_ip.getClientIp(req);
            if (-1 < allow_ip.indexOf(ip)) {
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
