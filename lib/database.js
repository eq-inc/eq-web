/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';


// Variables
const _ = require('lodash'),
    database = require('karmia-database');


/**
 * eq-web/database
 *
 * @class
 */
class Database {

    /**
     * Configure database
     *
     * @param {string} config
     */
    configure(config) {
        const self = this;
        self.config = config;

        return self;
    }


    /**
     * Get database instance
     *
     * @returns {KarmiaDatabase}
     */
    database() {
        const self = this;
        self.instance = self.instance || database(self.config);

        return self.instance;
    }

}


// Module exports
module.exports = new Database();



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
