const koa = require('koa');
const app = koa();
const extend = require('extend-object');
const config = require('@nodulus/config');
var options = {};
Object.assign(options, config.appSettings);
var router = require('koa-router')();

var activeport = options.port;
if (process.env.PORT !== undefined)
    activeport = process.env.PORT;
app.listen(activeport);
console.log("***************************************************************************");
console.log('*** nodulus is running on port ' + activeport + ' framework:koa ----------------------***');
console.log('*** you can change port and other configuration options in the ---------***');
console.log('*** server/config.json configuration file ------------------------------***');
console.log('*** thank you for using nodulus ----------------------------------------***');
console.log("***************************************************************************");

var addaptiveApp = {
    use: function (middleware) {
        return app.use(function* (next) {
            this.response.send = function(what) {
                console.log(what);                 
                this.body = what;
                
            }
            middleware(this.request, this.response);
        });
    },
    get: function (path, callback) {
        router.get(path, function* (next) {
            callback(this.request, this.response);
        });

    },
    post: function () { },
    put: function () { },
    delete: function () { }
}


module.exports = addaptiveApp;