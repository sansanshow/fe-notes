var path = require('path')

var d = new Date()
var month = d.getMonth() + 1
var today = `${d.getFullYear()}${month < 10 ? '0' + month : month}${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`

module.exports = {
    apiVersion: today,
    /** 本地开发 */
    development: {
        publicPath: '/',
        baseURL: '/api',
        fileURL: 'https://file.bugduo.com/',
        baiduKey: 'XXXXXXXXXXXXXXXXXXXXXXXX',
        proxy: {
            /*'/api/XXX': {
                target: 'http://192.168.187.18:39047',
                changeOrigin: true,
                pathRewrite: {
                    '^/api/XXX': ''
                },
                headers: {
                    "Referer": "http://localhost:8080/XXXX/",
                    'Bank-User-Info': JSON.stringify({
                        'uid': '28',
                    })
                }
            }*/
        }
    },
    /** 开发 */
    dev: {
        publicPath: '/xxx/',
        baseURL: '/api',
        fileURL: 'https://file.bugduo.com/',
        baiduKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
        deploy: {
            ip: '11.11.11.11',
            user: 'root',
            password: 'pwd1234',
            src: path.resolve(__dirname, '../dist'),
            dist: '/data/static'
        }
    }, 
    test: {
        publicPath: '/xxx/',
        baseURL: '/api',
        fileURL: 'https://file.bugduo.com/',
        baiduKey: '1111111111111111',
        deploy: {
            ip: '11.11.11.11',
            user: 'root',
            password: 'pwd1234',
            src: path.resolve(__dirname, '../dist'),
            dist: '/data/static'
        }
    },
    // gray演示环境
    gray: {
        publicPath: '/xxx/',
        baseURL: '/api',
        fileURL: 'https://file.bugduo.com/',
        baiduKey: '1111111111111111',
        deploy: {
            ip: '11.11.11.11',
            user: 'root',
            password: 'pwd1234',
            src: path.resolve(__dirname, '../dist'),
            dist: '/data/static'
        }
    },
    // 生产环境
    production: {
        publicPath: '/xxx/',
        baseURL: '/api',
        fileURL: 'https://file.bugduo.com/',
        baiduKey: '1111111111111111',
    }
}
