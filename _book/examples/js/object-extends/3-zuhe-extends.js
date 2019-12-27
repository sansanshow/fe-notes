/**
 * 组合继承
 */

function SuperType(name) {
  this.name=name;
  this.colors = ['red', 'green', 'blue'];
}

SuperType.prototype.sayName = function() {
  return this.name;
}

function SubType() {
  SuperType.call(this, 'Jack');
  this.age = 12;
}
SubType.prototype.getAge = function() {
  return this.age;
}

var sub1 = new SubType();
var sub2 = new SubType();

sub1.colors.push('black');

console.log('sub1.colors: ', sub1.colors); // ["red", "green", "blue", "black"]
console.log('sub2.colors: ', sub2.colors); // ["red", "green", "blue"]
sub1.sayName === sub2.sayName // true