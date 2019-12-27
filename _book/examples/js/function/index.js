function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}
// 当函数名变化时 就会存在错误-
// eg
function facName(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}
facName(3) // Uncaught ReferenceError: factorial is not defined

// 使用arguments.callee来解决

function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num - 1);
  }
}
var factorialRename = factorial;
factorialRename(5)

// 但是在严格模式下不能使用arguments.callee
// 可以使用命名函数表达式来解决
var factorial = (function fn(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * fn(num - 1);
  }
})

factorial(3);

/**
 * 
 */

function createFunctions() {
  var results = []
  for (var i = 0; i < 10; i++) {
    results[i] = function() {
      return i;
    }
  }
  return results;
}
var res = createFunctions()
res.forEach(func => {
  console.log(func());
})
// 会输出 10 个10
/**
 * 解决 es5 方案  立即执行
 */

function createFunctions2() {
  var results = []
  for (var i = 0; i < 10; i++) {
    results[i] = (function(num) {
      return function() {
        return num;
      }
    })(i)
  }
  return results;
}
var res = createFunctions2()
res.forEach(func => {
  console.log(func());
})

/**
 * 或者使用es6 let
 */

function createFunctions3_es6 () {
  var results = [];
  for (let i = 0; i < 10; i++) {
    results[i] = function () {
      return i;
    }
  }
  return results;
}
var res = createFunctions3_es6()
res.forEach(func => {
  console.log(func());
})


/**
 * 匿名函数的this
 * this对象是在运行时基于函数的执行环境决定的
 * 匿名函数的执行环境具有全局性，因此this对象通常指向window对象(当然除非使用了call apply bind等))
 */
var name = 'Window Name';
var obj = {
  name: 'Objname',
  getNameFunc: function() {
    return function () {
      return this.name;
    }
  },
  awesomeFunc: function() {
    console.log('inner',this.name);
    var func = obj.getNameFunc();
    console.log('func',  func.call(this))
    console.log('func',  (func.bind(this))())
  }
}

console.log(obj.awesomeFunc())


function outputNumbers(count) {
  for (let i = 0; i < count; i++) {
    console.log(i);
  }
  console.log(i); // Uncaught ReferenceError: i is not defined
}

//
function outputNumbers(count) {
  for (var i = 0; i < count; i++) {
    console.log(i); // 0 1 2 3...9
  }
  console.log(i); // 10
}


//
function outputNum2(count) {
  (function() {
    for(var i = 0; i < count; i++) {
      console.log(i);
    }
  })()
  console.log(i); // Uncaught ReferenceError: i is not defined
}

(function() {
  var now = new Date();
  if (now.getMonth() === 0 && now.getDate() === 1) {
    console.log('Happy New Year');
  } else {
    console.log('no...');
  }
})()

(function() {
  var privateVariable = 10;
  function privateMethod () {
    return false;
  }
  MyObj = function() {};
  MyObj.prototype.publicMethod = function() {
    privateVariable ++;
    return privateMethod();
  }
})();


/**
 * 执行完后再全局中创建了一个Person 构造函数
 */
(function() {
  var name = "";
  Person = function(value) {
    name = value;
  };

  Person.prototype.getName = function() {
    return name;
  }

  Person.prototype.setName = function(val) {
    name = val;
  }

})();
var p1 = new Person('Nick');
var p2 = new Person('Rose');

p1.getName();
p1.setName('Martin');
p1.getName();