/**
 * 借用构造函数
 * 这种方式就能有效的避免 原型继承 引用类型共享的问题
 * 缺陷：
 * 与构造函数问题相同-函数都在构造函数中声明了，没有复用性可言
 * 所以 会有组合继承的出现
 */

function SuperType(name) {
  this.colors = ["red", "green", "blue"];
  this.name = name;
  this.sayName = function() { // 每个中引用的都不是一个方法
    return this.name;
  }
}

function SubType() {
  SuperType.call(this, 'Nick');
  this.age = 12;
  
  this.getAge = function() {
    return this.age;
  }
}

SubType.prototype = new SuperType()

var sub1 = new SubType();

var sub2= new SubType();

sub1.colors.push('black');

console.log('sub1.colors: ', sub1.colors); // ["red", "green", "blue", "black"]
console.log('sub2.colors: ', sub2.colors); // ["red", "green", "blue"]
sub1.sayName === sub2.sayName // false