
console.log("@nodulus/core");
var express = require('express');
var fs = require('fs');
var path = require('path');


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var url = require('url');
var querystring = require('querystring');
var dal = require('@nodulus/data');
var config = require('@nodulus/config').config;
var webServer = require('./lib/web-server.js');
var api = require('@nodulus/api');
var cache = require("@nodulus/cache");

var EventEmitter = require('events').EventEmitter;
global.eventServer = new EventEmitter();
global.cache = cache;
var app = express();


var http = require("http").createServer(app);
var server = require('http').Server(app);
webServer.start(server, app, function () {
    // var socket = require('socket.io')(server);
    // var io = socket.listen(server);
    // 
    // console.log("socket listen on:" + io)
    // SocketUse(io);
});



var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;
app.use(bodyParser.json({
    reviver: function (key, value) {
        var match;
        if (typeof value === "string" && (match = value.match(regexIso8601))) {
            var milliseconds = Date.parse(match[0]);
            if (!isNaN(milliseconds)) {
                return new Date(milliseconds);
            }
        }
        return value;
    },
    limit: '50mb',
}));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

module.exports = app;
module.exports.static = express.static;
module.exports.server = server;











