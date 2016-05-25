/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true, stupid: true */
'use strict';



// Variables
const fs = require('fs'),
    path = require('path'),
    _ = require('lodash');


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
 * Setup middlewares
 */
module.exports.setup = function () {
    const context = this;

    /**
     * Recursive setup middleware
     *
     * @param {Object} middlewares
     */
    (function setup (middlewares) {
        Object.keys(middlewares).forEach(function (key) {
            if (_.isFunction(middlewares[key].setup)) {
                return context.call(value.setup);
            }

            if (_.isObject(middlewares[key])) {
                setup(middlewares[key]);
            }
        });
    }(require('./')));
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
