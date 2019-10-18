//# 1.交叉类型 A & B
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let key in first) {
    (<any>result)[key] = (<any>first)[key];
  }

  for (let key in second) {
    (<any>result)[key] = (<any>second)[key];
  }

  return result;
}

class Person {
  constructor(public name: string) { }
}

interface Loggable  {
  log(): void;
}

class Logger4Ts implements Loggable {
  log(): void {
    throw new Error("Method not implemented.");
  }

} 

let unionType = extend(new Person('jack'), new Logger4Ts());
console.log(unionType);


//# 2.联合类型
// padding 希望接收一个 number 或 string 类型的参数
function padLeft(value: string, padding: any) {
  if(typeof padding == 'number') {
    return Array(padding + 1).join(' ') + value;
  } 
  if(typeof padding == 'string') {
    return padding + ' ' + value;
  }
  console.error(`"padding" excepted "string" or "number", but get ${padding}`);
}

let p1 = padLeft('Hello, world', 4);
let p2 = padLeft('Hello, world', 'Siri');
let p3 = padLeft('Hello, world', {}); // 编辑通过，执行会有console 提示

// 使用联合类型后
function padLeftAfter(value: string, padding: number | string) {
  if(typeof padding == 'number') {
    return Array(padding + 1).join(' ') + value;
  } 
  if(typeof padding == 'string') {
    return padding + ' ' + value;
  }
  console.error(`"padding" excepted "string" or "number", but get ${padding}`); // 这个应该是不会出现了， 编译阶段就不会通过
}

let pa1 = padLeftAfter('Hello, world', 4);
let pa2 = padLeftAfter('Hello, world', 'Siri');
// let pa3 = padLeftAfter('Hello, world', {}); // Error 编译不通过
console.log(pa1, pa2)


// tips: 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。
interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}
// 麻雀
class Sparrow implements Bird {
  fly() {
    console.log("Method 'Sparrow-fly'");
  }
  layEggs() {
    console.log("Method 'Sparrow-layEggs'");
  }
}
// 金鱼
class GoldFish implements Fish {
  swim() {
    console.log("Method 'GoldFish-swim");
  }
  layEggs() {
    console.log("Method 'GoldFish-layEggs'");
  }


}

function getSmallPet(): Fish | Bird {
  // ...
  if (Math.random() > 0.35) {
    console.log('is  Sparrow');
    return new Sparrow();
  }
  console.log('is  GoldFish');
  return new GoldFish();
}

let pet = getSmallPet();
pet.layEggs(); // okay 共同的方法 调用没问题 
// pet.swim();    // errors 特有方法调用不成功 类型检测不通过

// 可以使用类型断言 使得代码可以运行
if((<Fish>pet).swim) {
  (<Fish>pet).swim()
} else  {
  (<Bird>pet).fly()
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}

if(isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

// null undefined

let sn: string | null = 'Bar';

sn = null;
sn = undefined;

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '.  the ' + epithet; // ok
  }
  name = name || "Bob";
  return postfix("great");
}

let res = fixed('Jack');
let res2 = fixed(null);
console.log(res, res2);

// # 别名

type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name {
  if (typeof n == 'string') {
    return n;
  }
  return n();
}

// # 接口 vs 类型别名
type Alias = { num: number };
interface Interface {
  num: number;
}


declare function aliased(arg: Alias): Alias; 
declare function interfaced(arg: Interface): Interface; 

// error
// function foo(x: number) {
//   if (x !== 1 || x !== 2) {
//       //         ~~~~~~~
//       // Operator '!==' cannot be applied to types '1' and '2'.
//   }
// }

// # 多态this
class BasicCalculator {
  public constructor(protected value: number) {}

  public currentValue(): number {
    return this.value;
  }
  public add(operand: number) {
    this.value += operand;
    return this;
  }

  public multiply(operand: number) {
    this.value *= operand;
    return this;
  }
  // other method
}

let v = new BasicCalculator(2)
          .multiply(5)
          .add(1);
console.log('BasicCalculator', v, v.currentValue());

function pluckJs(o, names) {
  return names.map(n => o[n]);
}

console.log(pluckJs({name: 0, age: 0}, ['name']))

// T[K] 索引访问操作符
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
  name: string,
  age: number,
  addr?: string,
}

let person: Person = {
  name: 'Jack',
  age: 18,
}

let v2 = pluck(person, ['name']);
console.log(v2);
let p: keyof Person = 'addr'; // let p: "name" | "age" | "addr"
console.log(p);


// 索引访问操作符
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name];
}
console.log("getProperty(person, 'name'):", getProperty(person, 'name'));
console.log("getProperty(person, 'name'):", getProperty(person, 'addr'));
