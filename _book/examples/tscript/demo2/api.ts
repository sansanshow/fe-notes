function printLabelX(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj2 = { size: 10, label: "Size 10 Object" };
printLabelX(myObj2);

interface SquareConfig2 {
  color?: string;
  width?: number;
  [key: string]: any;
}

function createSquare2(config: SquareConfig2): { color: string, area: number } {
  let defSquare = { color: 'white', area: 100 };
  if (config.color) {
    defSquare.color = config.color;
  }

  if (config.width) {
    defSquare.area = config.width * config.width;
  }
  return defSquare;
}
let paramX = {color: 'black', xxx: 'xxx'}
// let mySquare = createSquare2({color: 'black', width: 12});
let mySquareX = createSquare2({color: 'black', width: 12, otherProp: 111});
let mySquareX1 = createSquare2(paramX);
console.log(mySquareX);
console.log(mySquareX1);

// 只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}
let ps1: Point = {x: 1, y: 2}
// ps1.x = 12; // Error

let ass: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = ass;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// ass = ro; // error!
let ba: number[] = ro as number[];
let ba1 = ro;
// ba1.push(1); // Error Property 'push' does not exist on type 'ReadonlyArray<number>'.
console.log(ba);

interface getFunc {
  (str: string): Date;
}

interface ClockInterfaceS {
  currentTime: Date;
  setTime(d: Date);
  getTime: getFunc;
}

class ClockS implements ClockInterfaceS {
  currentTime: Date;
  setTime(d: Date) {
      this.currentTime = d;
  }
  getTime() {
    return this.currentTime;
  }
  constructor(h: number, m: number) {
    let curr = new Date();
    curr.setHours(h);
    curr.setMinutes(m);
    this.currentTime = curr;
  }
}

let clk = new ClockS(13, 56);
console.log('ClockS.getTime', clk.getTime());

class Animal {
  name: string;
  constructor(theName: string) { this.name = theName; }
  move(distanceInMeters: number = 0) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 5) {
      console.log("Slithering...");
      super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 45) {
      console.log("Galloping...");
      super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);


// 类- 存取器
let passcode = 'Hello World2'
class Employee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }
  
  set fullName(name: string) {
    if(passcode && passcode === 'Hello World') {
      this._fullName = name;
    }
  }
}

let employee1 = new Employee();
employee1.fullName = 'Bob Simith';

console.log(employee1.fullName)
