# koa2-converter-middleware

一个将express中间件转换为koa2中间件的小工具，可用于webpack-dev-middleware，对应的express版本为4.17.X,koa的版本号为2.x

## Getting Started

First thing's first, install the module:

```
npm install koa2-converter-middleware --save-dev
```

Note: We do not recommend installing this module globally.

## Usage

```javascript
const app = require('koa')();
const converter = require("koa2-converter-middleware");
//此处为引用的express中间件,测试的webpack-dev-middleware版本为4.1.0
const middleware = require('webpack-dev-middleware');
const compiler = webpack({
  // webpack options
});
app.use(converter(middleware(compiler, {
    // webpack-dev-middleware options
})));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

```

## Support

    在开发中遇到中间件的问题，在网上找的npm包过于古老或无人维护，所以自己发了个包。这里只是将express中间件包了一层，使其可以用在koa2上面，目前只在`webpack-dev-middleware`上试过。有问题请提issue。

