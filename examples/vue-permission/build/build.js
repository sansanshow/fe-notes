if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production'
}
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

if (process.env.npm_config_report) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin({
        analyzerPort: 8008
    }))
}

var spinner = ora(`building for ${process.env.NODE_ENV}...`)
spinner.start()

rm(path.resolve(__dirname, '../dist/static'), err => {
    if (err) throw err
    webpack(webpackConfig, function (err, stats) {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        console.log('Build complete.')
    })
})
