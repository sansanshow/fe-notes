const connect = require('connect')
const cgiMock = require('connect-cgi-mock')
console.log(connect)
connect.createServer({
    root: 'dev',
    livereload: true,
    middleware: function(){
        return [
            // 这里开始为connect-cgi-mock配置
            cgiMock({
                // cgi模拟数据文件根目录（本地目录）
                root: __dirname + '/cgiMock',

                // HTTP路由根路径（请求路径中/api下所有请求都会认为是CGI请求）
                // 路由支持 字符串（仅支持根路径起）/正则/函数
                route: '/api'
            })
        ]
    }
});