/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const util = require('util');


// Export module
module.exports = function (port) {
    return function (error) {
        if ('listen' !== error.syscall) {
            throw error;
        }

        const type = ('string' === typeof port) ? 'Pipe' : 'Port',
            bind = util.format('%s: %s', type, port);

        // Handle specific listen errors with friendly message
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    };
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
