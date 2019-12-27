var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AnimalAbs = /** @class */ (function () {
    function AnimalAbs(name) {
        this.name = name;
    }
    AnimalAbs.prototype.move = function () {
        console.log(this.name + " running....");
    };
    ;
    return AnimalAbs;
}());
var YanjingSnake = /** @class */ (function (_super) {
    __extends(YanjingSnake, _super);
    function YanjingSnake(name) {
        return _super.call(this, name + Math.ceil(Math.random() * 10)) || this;
    }
    YanjingSnake.prototype.makeSound = function () {
        console.log('listen: yanjing Snake');
    };
    ;
    return YanjingSnake;
}(AnimalAbs));
var Cow = /** @class */ (function (_super) {
    __extends(Cow, _super);
    function Cow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cow.prototype.makeSound = function () {
        console.log('listen: mow..');
    };
    return Cow;
}(AnimalAbs));
var yjs1;
yjs1 = new YanjingSnake('眼镜蛇');
yjs1.makeSound();
yjs1.move();
var cow1;
// cow1 = new AnimalAbs(); // Error
cow1 = new Cow('母牛');
cow1.makeSound();
cow1.move();
