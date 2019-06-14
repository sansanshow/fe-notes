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
