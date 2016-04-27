/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const context = require('./context'),
    express = require('./express'),
    middlewares = require('./middleware');


// Export module
module.exports = function () {
    const app = express();

    app.use(context.call(middlewares.access.middleware));
    app.use(context.call(middlewares.context.middleware));

    return app;
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
