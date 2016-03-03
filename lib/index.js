/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true, stupid: true */
'use strict';



// Variables
const crypto = require('crypto'),
    fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    cache = require('eq-cache'),
    database = require('karmia-database'),
    session = require('eq-session'),
    configurator = require('./config'),
    context = require('./context'),
    loggers = require('./logger'),
    utility = require('./utility');


// Export modules
_.forEach(fs.readdirSync(__dirname), function (filename) {

    if ('index.js' === filename) {
        return;
    }

    const extension = path.extname(filename),
        name = filename.replace(extension, '');

    module.exports[name] = require(path.join(__dirname, name));

});


/**
 * Configure modules
 *
 * @param {Object} config
 */
module.exports.configure = function (config) {
    // Configure
    configurator.configure(config);
    loggers.configure(configurator.logger);
    utility.date.configure(configurator.date);

    // Models
    const encrypt = configurator.encrypt || {},
        ecdh = crypto.createECDH(encrypt.curve || 'secp521r1'),
        database_instance = database(configurator.database),
        session_instance = session(database_instance.getConnection(), configurator.session),
        cache_instance = cache(database_instance.getConnection(), configurator.cache);
    ecdh.setPrivateKey(new Buffer(encrypt.private_key, 'base64'));
    ecdh.setPublicKey(new Buffer(encrypt.public_key, 'base64'));

    // Add to context
    context.set('config', configurator);
    context.set('loggers', loggers);
    context.set('utility', utility);
    context.set('ecdh', ecdh);
    context.set('cache', cache_instance);
    context.set('database', database_instance);
    context.set('session', session_instance);

    // Export module
    module.exports.ecdh = ecdh;
    module.exports.cache = cache_instance;
    module.exports.database = database_instance;
    module.exports.session = session_instance;
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
