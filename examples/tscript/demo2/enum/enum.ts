
/**
 * # 枚举
 */

// ## 1. 数字枚举

console.log('---# 数字枚举 #---');
enum Direction {
  Up = 1, // 可以指定开始值 之后递增 Up: 1  Down: 2 Left: 3 Right: 4
  // Up, // 若不指定 则 0 开始 依次递增 Up: 0  Down: 1 Left: 2 Right: 3
  Down,
  Left = 8, // Left=8 则 枚举 分别为 1 2 8 9；   当设置Left = 2的时候 则 枚举 为 1 2 2 3 (注意 重复)
  Right,
}

console.log(Direction.Up, Direction.Down, Direction.Left, Direction.Right);


// ## 字符枚举
console.log('---# 字符枚举 #---');
enum DirectionString {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  // Right, // Error: Enum member must have initializer  字符串枚举必须赋值
  Right = 'Right',
}


console.log(DirectionString.Up, DirectionString.Down, DirectionString.Left, DirectionString.Right);

// 枚举 对常量的引用
const up = 1;

enum DirectionEnum {
  Up = 1,
  Down = 3,
  Left = 'Left',
  Right = 'R',
}

console.log('const 引用', DirectionEnum.Up, DirectionEnum.Down, DirectionEnum.Left, DirectionEnum.Right);

//# 联合枚举与枚举成员的类型

console.log('---# 联合枚举与枚举成员的类型 #---');
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLenghth: number;
}

let c: Circle = {
  // kind: ShapeKind.Square, // Error incompatible
  kind: ShapeKind.Circle,
  radius: 7,
}

// 不能比较值
enum E {
  Foo,
  Bar,
  Oth,
}

function F(x: E) {
  // if (x !== E.Foo || x !== E.Bar) { // 先检查 x是否不是 E.Foo。 如果通过了这个检查，然后 ||会发生短路效果， 
     // if语句体里的内容会被执行。 然而，这个检查没有通过，那么 x则 只能为 E.Foo，因此没理由再去检查它是否为 E.Bar。
    console.log('not equal')
  // }
}
F(E.Bar);

// # 运行时 枚举
console.log('---# 运行时 枚举 #---');
enum ERun {
  X, Y, Z
}

function fRun(obj: {X: number, [key: string]: any}) {
  return obj.X
}

console.log(fRun(ERun));
console.log(fRun({X: 1}));
console.log(fRun({x: 1, X: 1}));

//# 反向 映射
console.log('---# 反向 映射 #---');
enum Enum {
  A,
}

let a = Enum.A; // 0

let keyOfA = Enum[a]; // 'A'

console.log(a, keyOfA);

// const 枚举
const enum ConstEnum {
  A = 1,
  B = A * 2,
}




