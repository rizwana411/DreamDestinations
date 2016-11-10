/* global process:true */

var angularity = require('webpack-angularity-solution');

const PORT    = 4444,
    GLOBALS = {
        $              : 'jquery',
        jQuery         : 'jquery',
        'window.jQuery': 'jquery'
    };
 /*node = {
    console: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
};*/
module.exports = angularity({globals: GLOBALS, port: PORT}, process.env)
    .include(process.env.MODE) // app|test|release
    .otherwise('app,test')     // run app+test if MODE is unspecified
    .resolve();

