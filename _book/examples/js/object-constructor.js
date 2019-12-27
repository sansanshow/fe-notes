/**
 * 对象 构造函数的几种方法
 * 1： newObject/ 对象字面量法
 * 2：工厂函数
 * 3：构造函数
 * 4：原型模式
 * 5：组合使用构造函数模式和原型模式
 * 6：动态原型模式
 * 7：寄生构造
 * 8：稳妥构造函数
 */
/**
 * 1:
 * new Object()
 */
var obj1 = new Object();
obj1.name = 'Jack';
obj1.age = 18;
obj1.friends = ['Martin', 'Lily', 'Rose'];
obj1.sayName = function() {
  return this.name;
}

//

obj1.sayName(); // "Jack"
obj1.name = "Xioaming"
alert(obj1.name); // "Xioaming"

/**
 * 对象字面量法
 */

var obj2 = {
  name: 'Jack',
  sayName: function() {
    return this.name;
  }
}

/**
 * 工厂函数
 */

function createObj3(name) {
  var obj = new Object();
  obj.name = name
  obj.sayName = function() {
    return this.name;
  }
  return obj;
}
var obj3 = createObj3('Rose');

/**
 * 构造函数模式
 */

function ObjCtr(name) {
  this.name = name;
  this.friends = ['Martin']
  this.sayName = function () {
    return this.name;
  }
}

var p1 = new ObjCtr('Jack');
var p2 = new ObjCtr('Rose');
// 检测 对象类型 既是Object 也是 Person
console.log(p1 instanceof Object); // true
console.log(p1 instanceof ObjCtr); // true

console.log(p2 instanceof Object); // true
console.log(p2 instanceof ObjCtr); // true

// 基本类型不共享
p1.sayName(); // Jack
p2.sayName(); // Rose

// 引用对象共享
p1.friends.push('Lily');
console.log(p1.friends); // ['Martin', 'Lily']
console.log(p2.friends); // ['Martin', 'Lily']


/**
 * 原型模式
 */

function ObjProto () {}

ObjProto.prototype.name = 'Default name';
ObjProto.prototype.age = 18;
ObjProto.prototype.sayName = function() {
  return this.name;
}

// 也可以
function ObjProto2() {}

ObjProto2.prototype = {
  constructor: ObjProto2, // TIP： 这个一定要加 否则  就失去了属性类型，不会指向`Person`重设`constructor`方式带来的后果就是，使得`constructor`的特性`[[Enumerable]]` 被设置为`true`。正常情况下`constructor`的特性`[[Enumerable]]` 的值为`false`
  name: 'DfNam',
  colors: ['red', 'green', 'blue'],
  age: 18,
  sayName: function() {
    return this.name;
  }
}
// 这种方式最大的问题是 引用类型共享数据 

/**
 * 组合使用构造函数模式和原型模式
 */

function ObjProtoAndCtr(name, age, colors) {
  this.name = name;
  this.colors = colors;
  this.age = age
}

ObjProtoAndCtr.prototype = {
  constructor: ObjProtoAndCtr,
  sayName: function() {
    return this.name;
  }
}
pn = new ObjProtoAndCtr('Jack', 12, ['red', 'green'])

// 改进方法
ObjProtoAndCtr.prototype = {
  sayName: function() {
    return this.name;
  }
}
Object.defineProperty(ObjProtoAndCtr.prototype, 'constructor', {
  value: ObjProtoAndCtr,
  enumerable: false
})

/**
 * 动态原型模式
 */

function DongtaiProto() {
  this.name = name;
  this.age = age;
  this.friends = friends;
  if (typeof this.sayName !== 'function') {
    DongtaiProto.prototype.sayName = function() {
      return this.name
    }
  }
}

/**
 * 寄生构造函数
 */
function JishengCtr(name, age, friends) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.friends = friends;
  o.sayName = function () {
    return this.name;
  }
  return o;
}

/**
 * 稳妥构造函数
 */

function WentuoCtr(name, age, friends) {
  var name = name;
  var age = age;
  var friends = friends;
  var o = new Object()
  o.setName = function(val) {
    name = val;
  }
  o.sayName = function () {
    return name;
  }
  return o;
}
var p1= new WentuoCtr('Jack', 19, ['Rose'])