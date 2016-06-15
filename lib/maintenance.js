/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
module.exports = {
    /**
     * Configure database
     *
     * @param database
     */
    setup: function (database) {
        database.define('maintenance', require('../schema/maintenance'));
    },

    /**
     * Get current maintenance data
     *
     * @param {Object} utility
     * @param {Object} database
     * @param {Function} callback
     */
    get: function (utility, database, callback) {
        const table = database.table('maintenance');
        table.find().then(function (result) {
            const now = utility.date.getDate(),
                maintenance = (result || []).find(function (value) {
                    const start = (value.start) ? (now >= new Date(value.start)) : true,
                        end = (value.end) ? (now <= new Date(value.end)) : true;

                    return (start && end);
                });

            callback(null, maintenance);
        }).catch(callback);
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
