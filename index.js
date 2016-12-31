var selectedCore = null;
if (!global.nodulus)
    global.nodulus = {};
    
if (global.nodulus && global.nodulus.core) {
    selectedCore = global.nodulus.core;
}
else {
    const config = require('@nodulus/config');
    var mode = config.appSettings.framework || 'express';
    global.nodulus.core = selectedCore = require('./lib/' + mode);
}
module.exports = selectedCore;