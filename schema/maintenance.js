/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Export module
module.exports = {
    type: 'object',
    key: ['maintenance_id'],
    properties: {
        maintenance_id: {
            type: 'varchar',
            required: true,
            unique: true
        },
        name: {
            type: 'varchar',
            required: true
        },
        message: {
            type: 'varchar',
            required: true
        },
        start: {
            type: 'varchar',
            default: ''
        },
        end: {
            type: 'varchar',
            default: ''
        },
        url: {
            type: 'varchar',
            default: ''
        }
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
