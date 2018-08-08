var exec = require("child_process").exec;
var querystring = require("querystring"),
    url = require('url'),
    fs = require("fs");

var formidable = require('formidable'),
    util = require('util');
function root(response) {
    console.log('root in requestHandlers');
    var content = 'Hello---root:Empty'
    // exec('find /', function(error, stdout, stderr) {
    //     content = stdout
    //     response.writeHead(200, {'Content-Type': 'text/plain'});
    //     response.write(content);
    //     response.end();
    // })
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function sleep(milliSeconds, cb) {
    var startTime = new Date().getTime();
    // var id = setInterval(function() {
    //     if (new Date().getTime() > startTime + milliSeconds) {
    //         cb();
    //         clearInterval(id)
    //     }
    // }, 2000)
    while (new Date().getTime() < startTime + milliSeconds);
    cb();
}

function asyc(response) {
    console.log('start in requestHandlers');
    // sleep(6*1000, function() {
    //     var content = 'Hello---start';
    //     response.writeHead(200, {'Content-Type': 'text/plain'});
    //     response.write(content);
    //     response.end();
    // })
    setTimeout(function() {
        var content = 'Hello---start';
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(content);
        response.end();
    }, 10*1000)
    
}

function start(response) {
    console.log("Request handler 'start' was called.");

    var content = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" '+
        'content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        var suffix = getFileSuffix(files.upload.name);
        var fileName = Math.random().toString(36).substr(2) + suffix;
        // fs.renameSync(files.upload.path, "/Temp/test.jpg");
        var readStream=fs.createReadStream(files.upload.path);
        var writeStream=fs.createWriteStream(`./tmp/${fileName}`);
        readStream.pipe(writeStream);
        readStream.on('end',function(){
            fs.unlinkSync(files.upload.path);
        });
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write(`<img src='/show?file=${fileName}' />`);
        response.end();
    });
}

/**
 * 获取文件后缀
 * @param {*} name 
 */
function getFileSuffix(name) {
    if(!name) return '';
    var suffix = '';
    if(name.lastIndexOf('.') !== -1) {
        suffix = name.substr(name.lastIndexOf('.'))
    }
    return suffix;
}
function show(response, request) {
    console.log("Request handler 'show' was called.");
    var query = querystring.parse(url.parse(request.url).query)
    fs.readFile(`./tmp/${query.file}`, "binary", function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.root = root;
exports.asyc = asyc;
exports.start = start;
exports.upload = upload;
exports.show = show;