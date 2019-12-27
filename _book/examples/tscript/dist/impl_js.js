var square = {};
square.color = "blue";
square.sideLen = 10;
var rect1 = {};
rect1.color = 'red';
rect1.length = 9;
rect1.width = 3;
function getCounter() {
    var counter = function (start) {
        this._start = start;
    };
    counter.interval = 2;
    counter.reset = function () {
        this._start = 0;
    };
    return counter;
}
var c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
console.log(c);
