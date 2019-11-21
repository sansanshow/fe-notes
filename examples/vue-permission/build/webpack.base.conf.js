var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('./config')

var isProduction = process.env.NODE_ENV === 'production'

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

var env = process.env.NODE_ENV

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: config[env].publicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.css', '.scss'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'iview$':  resolve('vendor') + '/iview/iview.js',
            '@': resolve('src'),
            'echarts': 'echarts/dist/echarts.min.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: utils.cssLoaders({
                        sourceMap: false,
                        extract: isProduction
                    })
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.sass$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env),
                API_VERSION: JSON.stringify(config.apiVersion),
                BASE_URL: JSON.stringify(config[env].baseURL),
                FILE_URL: JSON.stringify(config[env].fileURL),
                BAIDU_KEY: JSON.stringify(config[env].baiduKey)
            }
        })
    ]
}
