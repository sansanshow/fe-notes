// 引入内置http模块
var http = require('http');

// 创建一个简单服务器，访问http://127.0.0.1:1337/,显示Hello World
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');