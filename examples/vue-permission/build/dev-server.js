if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development'
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var config = require('./config')
var port = process.env.PORT || 8080

var proxyTable = {}

if(process.env.npm_config_proxydev) {
    proxyTable = config[process.env.NODE_ENV].proxy
}

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    quiet: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
})
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

app.use(require('connect-cgi-mock')({
    root: path.resolve(__dirname, '../mock'),
    route: '/api'
}))

// app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)

app.use(hotMiddleware)

app.use('/static', express.static('./static'))

var uri = 'http://localhost:' + port + '/index.html'

var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    opn(uri)
    _resolve()
})

var server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}
