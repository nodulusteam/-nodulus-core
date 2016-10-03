'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();

const extend = require('extend-object');
const config = require('@nodulus/config');
var options = {};
Object.assign(options, config.appSettings);


var activeport = options.port;
if (process.env.PORT !== undefined)
    activeport = process.env.PORT;

server.connection({ port: activeport });

console.log("***************************************************************************");
console.log('*** nodulus is running on port ' + activeport + ' framework:hapi ---------------------***');
console.log('*** you can change port and other configuration options in the ---------***');
console.log('*** server/config.json configuration file ------------------------------***');
console.log('*** thank you for using nodulus ----------------------------------------***');
console.log("***************************************************************************");

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});



var addaptiveApp = {
    use: function (middleware) {

        server.route({
            method: ['GET'],
            path: '/index',
            handler: function (request, reply) {
                request.originalUrl = request.url.href;

                var response = {
                    send: function (what) {
                        reply(what);

                    }
                }
                middleware(request, response);

            }
        });



    },
    get: function (path, callback) {
        // router.get(path, function* (next) {
        //     callback(this.request, this.response);
        // });
        server.route({
            method: ['GET'],
            path: path,
            handler: function (request, reply) {
                callback(request, reply);

            }
        });


    },
    post: function () { },
    put: function () { },
    delete: function () { }
}

module.exports = addaptiveApp;
