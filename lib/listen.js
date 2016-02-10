/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const http = require('http'),
    context = require('./context'),
    listener = require('./listener');


// Export module
module.exports = function (app, options) {
    options = options || {};
    const server = http.createServer(app),
        port = options.port || 3000,
        listen = options.listen || '0.0.0.0';

    server.on('error', context.call(listener.error, {port: port}));
    server.on('listening', context.call(listener.listening, {server: server}));

    return server.listen(port, listen);
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
