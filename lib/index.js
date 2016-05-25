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
    loggers = require('./loggers'),
    user = require('./user'),
    utility = require('./utility'),
    middlewares = require('./middleware');


// Export modules
fs.readdirSync(__dirname).forEach(function (filename) {
    if ('index.js' === filename) {
        return;
    }

    var extension = path.extname(filename),
        name = filename.replace(extension, '');

    module.exports[name] = require(path.join(__dirname, name));
});



/**
 * Configure modules
 *
 * @param {Object} config
 */
module.exports.configure = function (config) {
    // Configurator
    configurator.configure(config);


    // Configure Modules
    const encrypt = configurator.encrypt || {},
        ecdh = crypto.createECDH(encrypt.curve || 'secp521r1'),
        database_instance = database(configurator.database),
        session_instance = session(database_instance.getConnection(), configurator.session),
        cache_instance = cache(database_instance.getConnection(), configurator.cache);
    if (encrypt.private_key && encrypt.public_key) {
        ecdh.setPrivateKey(Buffer.from(encrypt.private_key, 'base64'));
        ecdh.setPublicKey(Buffer.from(encrypt.public_key, 'base64'));
    } else {
        ecdh.generateKeys();
    }

    loggers.configure(configurator.logger);
    utility.date.configure(configurator.date);
    user.setup(database_instance);


    // Add to context
    context.set('config', configurator);
    context.set('loggers', loggers);
    context.set('logger', loggers.get('default'));
    context.set('utility', utility);
    context.set('ecdh', ecdh);
    context.set('cache', cache_instance);
    context.set('database', database_instance);
    context.set('session', session_instance);


    // Setup middlewares
    context.call(middlewares.setup);


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
