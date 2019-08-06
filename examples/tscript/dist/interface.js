var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function printLabel(labelObj) {
    console.log(labelObj.label);
}
var myObj = { size: 10, label: 'some label value' };
printLabel(myObj);
function createSquare(config) {
    var defSquare = { color: 'white', area: 100 };
    if (config.color) {
        defSquare.color = config.color;
    }
    if (config.width) {
        defSquare.area = config.width * config.width;
    }
    return defSquare;
}
var pars = { color: 'sss', colour: 'black' };
var mySquare = createSquare(pars);
var mySquare2 = createSquare({ color: 'sss', colour: 'black' });
var mySquare3 = createSquare({ color: 'sss', colour: 'black', colour2: 1 });
console.log(mySquare);
var p1 = { x: 10, y: 12 };
// p1.x = 12; // error: [ts] Cannot assign to 'x' because it is a constant or a read-only property.
// 只读 Array
var a = [1, 2, 3];
var roa = [1, 2, 3, 4];
// roa[0] = 9; // [ts] Index signature in type 'ReadonlyArray<number>' only permits reading.
// roa.push(3); // [ts] Property 'push' does not exist on type 'ReadonlyArray<number>'.
// a = roa; // [ts] Type 'ReadonlyArray<number>' is not assignable to type 'number[]'.    Property 'push' is missing in type 'ReadonlyArray<number>'.
a = roa;
console.log(a);
var mySearchFunc;
mySearchFunc = function (src, sub, options) {
    return true;
};
// mySearchFunc(); // [ts] Expected 3 arguments, but got 0.
mySearchFunc('key', 'goods', { name: 'jack' }); // [ts] Expected 3 arguments, but got 0.
// let sa: StringArray = {1: '2'}
// tips: TypeScript支持两种索引签名：字符串和数字。 
// 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。 
// 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。
// 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dog;
}(Animal));
var as1 = {};
as1 = { '11': 1 };
as1['10'] = 11;
as1[10] = 1;
console.log(as1[10], as1['10'], as1[11]);
var Clock = /** @class */ (function () {
    function Clock(h, m) {
    }
    Clock.prototype.setTime = function (d) {
        this.currtime = d;
    };
    return Clock;
}());
var DigitalClock = /** @class */ (function () {
    function DigitalClock(h, m) {
        this.hour = h;
        this.min = m;
    }
    DigitalClock.prototype.tick = function () {
        console.log('beep beep', "time>>" + this.hour + ": " + this.min);
    };
    return DigitalClock;
}());
var AnalogClock = /** @class */ (function () {
    function AnalogClock(h, m) {
        this.hour = h;
        this.min = m;
    }
    AnalogClock.prototype.tick = function () {
        console.log('tick tock', "time>>" + this.hour + ": " + this.min);
    };
    return AnalogClock;
}());
function createClock(ctor, hour, min) {
    return new ctor(hour, min);
}
var dClock = createClock(DigitalClock, 13, 17);
var aClock = createClock(AnalogClock, 18, 12);
dClock.tick();
aClock.tick();
