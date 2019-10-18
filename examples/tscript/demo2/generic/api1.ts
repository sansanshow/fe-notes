function identify<T>(args: T): T {
  return args;
}

let ret1_num = identify<number>(1);
let ret2_str = identify<string>('oh string~');
console.log(ret1_num, ret2_str);

// 泛型 接口
interface GenericIdentifyFn {
  <T>(arg: T): T;
}


let myIdFn: GenericIdentifyFn = identify;

let ret_id_gen = myIdFn({name: 'Rose', lastName: 'Jack'});
console.log(ret_id_gen);

// 具体泛型的 泛型 函数接口
interface GenericIdentifyFn2<T> {
  (arg: T): T;
}

let myIdFn2: GenericIdentifyFn2<string> = identify;

let ret_gen2 = myIdFn2('GenericIdentifyFn2_11232');

console.log(ret_gen2);


// 泛型类

class GenericObj<T> {
  zeroVal: T;
  add: (x:T, y:T) => T;
}

let myNumber = new GenericObj<number>();

myNumber.zeroVal = 0;
myNumber.add = function(x: number, y: number) {
  return x + y;
}

console.log('GenericObj<T>--> GenericObj<number>: myNumber', myNumber.zeroVal, myNumber.add(3, 5));

// 泛型约束

function loggingIndentify<T> (arg: T): T {
  // console.log(arg.length); // Property 'length' does not exist on type 'T'.
  return arg;
}

// 相比于操作any所有类型，我们想要限制函数去处理任意带有.length属性的所有类型。 只要传入的类型有这个属性，我们就允许，就是说至少包含这一属性。 为此，我们需要列出对于T的约束要求。

interface LogParams {
  length: number;
}


//创建一个包含 .length属性的接口，使用这个接口和extends关键字来实现约束：
function loggingIndentifyEx<T extends LogParams> (arg: T): T {
  console.log(arg.length); // Property 'length' does not exist on type 'T'.
  return arg;
}

console.log(loggingIndentifyEx(new Array(5)));
// Error
// loggingIndentifyEx(2);
loggingIndentifyEx({length: 4});



// 5: 在泛型约束中使用类型参数   这个例子 跑不通
// function getProperty(obj: T, key: K) {
//   return obj[key];
// }
// let x = { a: 1, b: 2, c: 3, d: 4 };

// getProperty(x, "a"); // okay
// getProperty(x, "m");


// 一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系。

class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(ctor: new () => A): A {
  return new ctor();
}

createInstance(Lion).keeper.nametag = 'JackMa';
createInstance(Bee).keeper.hasMask = false;
console.log(createInstance(Lion).keeper.nametag, createInstance(Bee).keeper.hasMask);
