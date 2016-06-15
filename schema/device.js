/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Export module
module.exports = {
    type: 'object',
    key: ['device_id'],
    properties: {
        device_id: {
            type: 'string',
            required: true,
            unique: true
        },
        user_id: {
            type: 'string',
            default: '',
            index: true
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
