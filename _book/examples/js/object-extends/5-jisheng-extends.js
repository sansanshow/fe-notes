/**
 * 寄生继承
 */
function newobject(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function createAnothor(original) {
  var clone = newobject(original);
  clone.sayHi = function() {
    return 'hi';
  }
  return clone;
}