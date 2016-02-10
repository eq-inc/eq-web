/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Export module
module.exports = function (server) {
    return function () {
        const addr = server.address(),
            bind = (typeof addr === 'string') ? 'pipe ' + addr : 'port ' + addr.port;

        console.log('Listening on ' + bind);
    };

};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
