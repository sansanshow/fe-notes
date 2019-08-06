interface LabelValue {
  label: string;
}


function printLabel(labelObj: LabelValue) {
  console.log(labelObj.label);
}
let myObj = { size: 10, label: 'some label value' };

printLabel(myObj);

interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}

function createSquare(config: SquareConfig): { color: string, area: number } {
  let defSquare = { color: 'white', area: 100 };
  if (config.color) {
    defSquare.color = config.color;
  }

  if (config.width) {
    defSquare.area = config.width * config.width;
  }
  return defSquare;
}
let pars = {color: 'sss', colour: 'black'};
let mySquare = createSquare(pars);
let mySquare2 = createSquare({color: 'sss', colour: 'black'} as SquareConfig);
let mySquare3 = createSquare({color: 'sss', colour: 'black', colour2: 1});

console.log(mySquare);

// 只读属性

interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 12 };
// p1.x = 12; // error: [ts] Cannot assign to 'x' because it is a constant or a read-only property.

// 只读 Array
let a: number[] = [1, 2, 3];
let roa: ReadonlyArray<number> = [1, 2, 3, 4];

// roa[0] = 9; // [ts] Index signature in type 'ReadonlyArray<number>' only permits reading.
// roa.push(3); // [ts] Property 'push' does not exist on type 'ReadonlyArray<number>'.
// a = roa; // [ts] Type 'ReadonlyArray<number>' is not assignable to type 'number[]'.    Property 'push' is missing in type 'ReadonlyArray<number>'.

a = roa as number[];
console.log(a);

// 函数 类型
interface SearchFunc {
  // 参数类型--->：(source: string, substring: string): boolean;<--返回类型boolean
  (source: string, substring: string, options: object): boolean;
}

let mySearchFunc: SearchFunc;
mySearchFunc = function(src: string, sub: string, options: object) { // 参数名随意，但是参数顺序类型必须一致
  return true;
}
// mySearchFunc(); // [ts] Expected 3 arguments, but got 0.

mySearchFunc('key', 'goods', {name: 'jack'}); // [ts] Expected 3 arguments, but got 0.


// 可索引的类型
interface StringArray {
  [index: number]: string;
  name: number;
}

// let sa: StringArray = {1: '2'}

// tips: TypeScript支持两种索引签名：字符串和数字。 
// 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。 
// 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。
// 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。

class Animal {
  name: string;
}

class Dog extends Animal {
  breed: string; // breed 品种
}

// 错误示例
// interface NotOkay {
//   [x: number]: Animal;
//   [x: string]: Dog;
// }
// 正确 - Dog 是 Animal 的子类 （number 对应返回值 是 string 子类）
interface Okay {
  [x: number]: Dog;
  [x: string]: Animal;
}


// 
// interface StringDictionary {
//   name: string;
//   age: number;
//   [index: string]: string;
// }
// interface StringDictionary2 {
//   [index: number]: string;
//   name: number;
// }
/**
 * 以上StringDictionary 报错的原因是：[index: string]: string 与 age: number 冲突
 * age 是string 类型的： 与[index: string] 匹配 ，[index: string]返回值启期待是string类型
 * 但是age的返回值是number类型，所以出错
 */

// -----
// 
interface NumberString {
  // [index: string]: number;
  [index: number]: number;
}
let as1:NumberString = {};
as1 = {'11': 1};
as1['10'] = 11;
as1[10] = 1;

console.log(as1[10], as1['10'],as1[11])

// 类类型

interface IClock {
  currtime: Date;
  setTime(d: Date);
}

class Clock implements IClock {
  currtime: Date;
  constructor(h: number, m: number) {
    
  }
  setTime(d: Date) {
    this.currtime = d;
  }

}

//
interface IClockConstructor {
  new (houer: number, min: number): ClockInterface;
}

interface ClockInterface {
  hour: number;
  min: number;
  tick();
}

class DigitalClock implements ClockInterface {
  hour: number;
  min: number;
  tick() {
    console.log('beep beep', `time>>${this.hour}: ${this.min}`);
  }
  constructor(h: number, m: number) {
    this.hour = h;
    this.min = m;
  }
}

class AnalogClock implements ClockInterface {
  hour: number;
  min: number;
  tick() {
    console.log('tick tock', `time>>${this.hour}: ${this.min}`);
  }
  constructor(h: number, m: number) {
    this.hour = h;
    this.min = m;
  }
}

function createClock(ctor: IClockConstructor, hour: number, min: number) {
  return new ctor(hour, min);
}

let dClock = createClock(DigitalClock, 13, 17);
let aClock = createClock(AnalogClock, 18, 12);

dClock.tick();
aClock.tick();
