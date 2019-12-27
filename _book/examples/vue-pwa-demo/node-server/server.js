var http = require('http');
var url = require('url');
var path = require('path');
var readStaticFile = require('./modules/readStaticFile');
var server = http.createServer(function(req, res) {
    // 业务逻辑
    var urlObj = url.parse(req.url);
    var urlPathname = urlObj.pathname;
    var filePathname = path.join(__dirname, "../dist", urlPathname);
    
    readStaticFile(res, filePathname);

});

server.listen(3000, function() {
    console.log("静态资源服务器运行中.");
    console.log("正在监听 3000 端口:")
})