/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const session = require('eq-session');


/**
 * eq-web/database
 *
 * @class
 */
class Session {

    /**
     * Configure session
     *
     * @param {KarmiaDatabase} database
     * @param {string} config
     */
    configure(database, config) {
        const self = this;
        self.database = database;
        self.config = config;

        return self;
    }


    /**
     * Get database instance
     *
     * @returns {EqSession}
     */
    session() {
        const self = this;
        self.instance = self.instance || session(self.database.getConnection(), self.config);

        return self.instance;
    }

}


// Module exports
module.exports = new Session();



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
