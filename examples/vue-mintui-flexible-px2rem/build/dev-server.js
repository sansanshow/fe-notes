if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

var opn = require('opn');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var WebpackDevMiddleware = require('webpack-dev-middleware');
var WebpackHotMiddleware = require('webpack-hot-middleware');

var config = require('./webpack.dev.conf');
// config.entry.app = ['webpack-hot-middleware/client', config.entry.app]
var port = config.devServer.port || 8080;

var compiler = webpack(config);

var proxyTable = {}

if(process.env.npm_config_proxydev) {
    proxyTable = config[process.env.NODE_ENV].proxyTable
}

var app = express();

var devMiddleware = WebpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true },
  quiet: true,
  watchOptions: {
      aggregateTimeout: 300,
      poll: true
  }
});

var hotMiddleware = WebpackHotMiddleware(compiler);

compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit',function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
});

Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
      options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

app.use('/static', express.static('./static'));

app.use(devMiddleware);
app.use(hotMiddleware);

var uri = 'http://localhost:' + port;

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
});

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  opn(uri)
  _resolve()
})

app.use(require('connect-cgi-mock')({
  root: path.resolve(__dirname, '../mock'),
  route: '/api'
}))

var server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}


