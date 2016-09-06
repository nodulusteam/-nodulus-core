
console.log("@nodulus/core");
var express = require('express');
var fs = require('fs');
var path = require('path');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var url = require('url');
var querystring = require('querystring');
var busboy = require('connect-busboy');

var webServer = require('./lib/web-server.js');

var cors = require('cors');
var EventEmitter = require('events').EventEmitter;
global.eventServer = new EventEmitter();

var server = null;
var app = null;
if (global.nodulus_app) {
    app = global.nodulus_app;
    server = global.nodulus_server;
}
else {
    app = express();
    global.nodulus_app = app;
    var http = require("http").createServer(app);
    server = require('http').Server(app);
    global.nodulus_server = server;
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
    
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(cors());
    app.use(busboy());
}



module.exports = app;
module.exports.static = express.static;
module.exports.Router = express.Router;
module.exports.server = server;











