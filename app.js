"use strict";
const bodyParser = require("body-parser");
const express = require("express");
var busboy = require('connect-busboy');
var webServer = require('./lib/web-server.js');
var EventEmitter = require('events').EventEmitter;
var cors = require('cors');
var server = null;
function initCore(options) {
    global.eventServer = new EventEmitter();
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
        webServer.start(server, app, options, function () {
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
    return {
        app: app,
        static: express.static,
        Router: express.static,
        server: server
    };
}
module.exports = initCore;
module.exports.express = express;
