var http = require('http');
var url = require("url");
function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname =url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response, request);

        // 监听post数据
        // request.setEncoding("utf8");

        // request.addListener("data", function(postDataChunk) {
        //     postData += postDataChunk;
        //     console.log("Received POST data chunk '"+
        //     postDataChunk + "'.");
        // });
      
        // request.addListener("end", function() {
        //     route(handle, pathname, response, postData);
        // });
    }
    http.createServer(onRequest).listen(3030);
    console.log('Server had started at: http://localhost:3030');
}

exports.start = start;