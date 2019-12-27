/**
 * ES6继承
 */

class Animal {
  constructor (name) {
    this.speed = 0;
    this.name = name || 'Animal';
  }

  run (speed) {
    this.speed = speed;
    console.log(`${this.name} run with speed ${this.speed}.`);
  }

  stop () {
    console.log(`${this.name} stopped !!`);
  }
}

class Rabbit extends Animal {
  constructor (name) {
    // 继承类中的构造函数必须调用 super（...），(!)并且在使用 this 之前执行它。
    // super(name);
    
    // 正常
    super(name);
    this.otherInfo = 'hahaha';
  }
  hide () {
    console.log(`${this.name} hide.`);
  }
}

let rabbit1 = new Rabbit('RabbitA');
rabbit1.run(100);
rabbit1.stop();
rabbit1.hide();

/**
 * extends 后可跟表达式
 * 
 * 例子中，class User 继承了 f('Hello')返回的结果。
 * 对于高级编程模式，当我们使用的类是根据许多条件使用函数来生成时，这就很有用。
 */
function f(phrase) {
  if (phrase == 100) {
    return class {
      sayHi () {
        console.log('This is a good man');
      }
    }
  }
  return class {
    sayHi () {
      console.log(phrase);
    }
  }
}

class User extends f('hello~') {

}
class User2 extends f(100) {

}

let user1 = new User();
let user2 = new User2();
user1.sayHi();
user2.sayHi();