var _webServer = (function () {
    var config = require('@nodulus/config').config;
    var path = require('path');


    function _start(server, app, callback) {

        var activeport = config.appSettings.port;
        if (process.env.PORT !== undefined)
            activeport = process.env.PORT;

        server.listen(activeport, function () {
            console.log("***************************************************************************");
            console.log('*** nodulus is running on port ' + activeport + ' ------------------------------------***');
            console.log('*** you can change port and other configuration options in the ---------***');
            console.log('*** server/config.json configuration file ------------------------------***');
            console.log('*** thank you for using nodulus ----------------------------------------***');
            console.log("***************************************************************************");
            callback(app);
        });


        app.get('/', function (req, res) {
            var options = {
                root: global.appRoot,
                dotfiles: 'deny',
                headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true
                }
            };


            var actual_path = config.appSettings.defaultPage || path.join('./', 'public', 'default.html');

            if (config.appSettings.defaultPage)
                actual_path = config.appSettings.defaultPage;
                
            //res.set('Content-Type',  mimeTypes[req.route.path.replace("/*", "")]);
            res.sendFile(actual_path, options);
        });


    }



    return {
        start: _start
    };
})();
// node.js module export
module.exports = _webServer;