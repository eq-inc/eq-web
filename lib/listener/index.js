/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true, stupid: true */
'use strict';



// Variables
const fs = require('fs'),
    path = require('path'),
    _ = require('lodash');


_.forEach(fs.readdirSync(__dirname), function (filename) {

    if ('index.js' === filename) {
        return;
    }

    const extension = path.extname(filename),
        name = filename.replace(extension, '');

    module.exports[name] = require(path.join(__dirname, name));

});



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
