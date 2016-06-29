/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const _ = require('lodash'),
    codes = {
        400: 'Bad Request',
        401: 'Unauthorized',
        402: 'Payment Required',
        403: 'Forbidden',
        404: 'Not Found',
        405: 'Method Not Allowed',
        406: 'Not Acceptable',
        407: 'Proxy Authentication Required',
        408: 'Request Timeout',
        409: 'Conflict',
        410: 'Gone',
        411: 'Length Required',
        412: 'Precondition Failed',
        413: 'Payload Too Large',
        414: 'URI Too Long',
        415: 'Unsupported Media Type',
        416: 'Range Not Satisfiable',
        417: 'Expectation Failed',
        418: "I'm a teapot",
        422: 'Unprocessable Entity',
        423: 'Locked',
        424: 'Failed Dependency',
        426: 'Upgrade Required',
        451: 'Unavailable For Legal Reasons',
        500: 'Internal Server Error',
        501: 'Not Implemented',
        502: 'Bad Gateway',
        503: 'Service Unavailable',
        504: 'Gateway Timeout',
        505: 'HTTP Version Not Supported',
        506: 'Variant Also Negotiates',
        507: 'Insufficient Storage',
        509: 'Bandwidth Limit Exceeded',
        510: 'Not Extended'
    },
    messages = Object.keys(codes).reduce(function (result, code) {
        result[codes[code].toLowerCase()] = code;

        return result;
    }, {});


// Export module
module.exports = function (message, code) {
    const result = {
        code: code,
        message: message || ''
    };
    if (_.isObject(message)) {
        result.code = result.code || message.code;
        result.message = message.message || '';
        result.stack = message.stack || '';
    }

    result.code = Number(result.code || messages[result.message.toLowerCase()] || 500);
    result.message = result.message || codes[result.code];
    result.stack = result.stack || new Error().stack;

    return result;
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
