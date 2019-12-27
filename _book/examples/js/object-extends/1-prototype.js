// 父对象
function SuperType() {
  this.property = true;
  this.colors = ['red', 'green', 'blue'];
}

SuperType.prototype.getSuperValue = function() {
  return this.property;
}

function SubType() {
  this.subproperty = false;
}

// 继承SuperType
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function() {
  return this.subproperty;
}

var sub = new SubType()

var subVal = sub.getSubValue();
var superVal = sub.getSuperValue();

var sub2 = new SubType();

sub.colors.push('pink');

console.log('sub.colors', sub.colors); // ["red", "green", "blue", "pink"]
console.log('sub2.colors', sub2.colors);// ["red", "green", "blue", "pink"]

console.log(subVal, superVal); // false, true
/**
 * 原型继承：缺陷
 * 引用类型的继承会共享数据 比如例子中的colors
 * 
 * 在sub中修改colors 
 * sub2中的colors 也会跟着修改；
 */
