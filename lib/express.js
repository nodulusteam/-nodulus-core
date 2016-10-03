"use strict";
const bodyParser = require("body-parser");
const express = require("express");
var busboy = require('connect-busboy');
var webServer = require('./web-server.js');
var EventEmitter = require('events').EventEmitter;
var cors = require('cors');

var options = {};


var app = express(); 
var http = require("http").createServer(app);
var server = require('http').Server(app);
 
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



module.exports = app;
