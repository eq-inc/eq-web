/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const configurator = require('./config'),
    context = require('./context'),
    database = require('./database'),
    loggers = require('./logger'),
    session = require('./session'),
    utility = require('./utility');


// Export module
module.exports = function (config) {

    // Configure
    configurator.configure(config);
    database.configure(config.database);
    loggers.configure(configurator.logger);
    utility.date.configure(configurator.date);

    // Session
    const db = database.database();
    session.configure(db, configurator.session);

    // Add to context
    context.set('config', configurator);
    context.set('loggers', loggers);
    context.set('utility', utility);
    context.set('database', db);
    context.set('session', session.session());

};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
