/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const configurator = require('./config'),
    context = require('./context'),
    loggers = require('./logger'),
    utility = require('./utility');


// Export module
module.exports = function (config) {

    // Configure
    configurator.configure(config);
    loggers.configure(configurator.logger);
    utility.date.configure(configurator.date);

    // Add to context
    context.set('config', configurator);
    context.set('loggers', loggers);
    context.set('utility', utility);

};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
