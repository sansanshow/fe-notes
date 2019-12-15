/**
 * 原型式继承
 * 相当于 对一个对象的浅复制
 * 缺陷：
 * 也是同样的 共享了 引用类型 
 * Object.create()相似哦
 */
function newobject(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

var person = {
  name: 'Brown',
  friends: ['Jack', 'Tony']
}

var onePers = newobject(person);

onePers.friends.push('Mark');

var anotherPers = newobject(person);
anotherPers.friends.push('Mark');

console.log(onePers.friends); // (4) ["Jack", "Tony", "Mark", "Mark"]
console.log(anotherPers.friends); // (4) ["Jack", "Tony", "Mark", "Mark"]