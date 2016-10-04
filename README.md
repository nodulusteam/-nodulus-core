# @nodulus/core

## Installation

```bash
$ npm install @nodulus/core
```

## Philosophy

the nodulus core lets you choose from popular nodejs frameworks, using the application configuration file.


config key
```
{
  framework: 'express'|'hapi'|'koa'
}
```

framework agnosticism is acheieved by using a common interface to either of the configurated frameworks.




## usage

```
var core = require('@nodulus/core');

//core object contains the framework app.
core.use('/path', function(req,res){

});

core.use('/path', core.static('/filepath'));

```


## configuration
set the default page using the configuration:

```

defaultPage: "public/default.html"

```
 
## License

  [MIT](LICENSE)
# -nodulus-core
