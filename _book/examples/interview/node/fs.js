var fs = require("fs");

function read() {
    fs.readFile('examples/interview/node/input.txt', function (err, data) {
    if (err){
        console.log(err.stack);
        return;
    }
    console.log(data.toString());
    });
}
setInterval(read, 2000);
console.log("程序执行完毕");