/// <reference path="./typings/nodulus/nodulus.d.ts" />


import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as fs from "fs";
import * as url from "url";
import * as querystring from "querystring";

var busboy = require('connect-busboy');
var webServer = require('./lib/web-server.js');
var EventEmitter = require('events').EventEmitter;
var cors = require('cors');
var server: any = null;
function initCore(options: any) {
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
            // var socket = require('socket.io')(server);
            // var io = socket.listen(server);
            // 
            // console.log("socket listen on:" + io)
            // SocketUse(io);
        });
        var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

    }
    return {
        app: app,
        static: express.static,
        Router: express.static,
        server: server
    }
}




module nodulus {
    export class Core {
        _init() {

            this.app = express();
            this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
            this.app.use(cors());
            this.app.use(busboy());

            var http = require("http").createServer(this.app);
            this.server = require('http').Server(this.app);


        }

        private static _instance: Core;
        public app: Express.Application;
        public server: any;
        constructor(singletonEnforcer: () => void) {
            if (singletonEnforcer !== SingletonEnforcer) {
                throw new Error("Error: Instantiation failed: Use Singleton.getInstance() instead of new.");
            }
            this._init();
        }
        public static getInstance(): Core {
            if (Core._instance == null) {
                Core._instance = new Core(SingletonEnforcer);
            }
            return Core._instance;
        }




    }
    function SingletonEnforcer() { }
}



module.exports = initCore;
module.exports.express = express;











