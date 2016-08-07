
console.log(">>>>> starting application");
var express = require('express');
var fs = require('fs');
var path = require('path');


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var url = require('url');
var querystring = require('querystring');
var dal = require('@nodulus/data');
var config = require('@nodulus/config').config;
//var SocketUse = require('./classes/socket.js');
var webServer = require('./lib/webServer.js');
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
//app.use('/Users', require('./routes/users.js'));


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
//app.set('view engine', 'ejs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// app.use(function (req, res, next) {
//     //we handle only no extension requests
//     if (req.url.indexOf('.') == -1) {

//         dal.connect(function (err, db) {
//             db.collection("Menu").find({ "Path": req.originalUrl }).toArray(function (err, data) {
//                 req.navigation = data[0];

//                 next();
//             });
//         });


//         //var context = new global.nodulus.classes.Context(req, res);
//         //recurseme(context, function (result) {

//         //    context.res.send(result);
//         //});


//     }
//     else {
//         //this is not a run page, move on
//         next();
//     }
// }
// );

// console.log(">>>>> initialize nodulus middleware");
// app.use(require('@nodulus/run'));

module.exports = app;

module.exports.static = function (route, path) {

    app.use(route, express.static(path));
}
//load modules
//  app.use("/", require('./routes/content.js'));











