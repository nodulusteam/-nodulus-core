const config = require('@nodulus/config');
var mode = config.appSettings.framework || 'express';
var selectedCore = require('./lib/' + mode);
module.exports = selectedCore;