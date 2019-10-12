abstract class  AnimalAbs {
  abstract makeSound(): void;
  move(): void {
    console.log(`${this.name} running....`);
  }
  constructor(public name:string) {};
}

class YanjingSnake extends AnimalAbs {
  makeSound(): void {
    console.log('listen: yanjing Snake');
  }
  constructor(name:string) {
    super(name + Math.ceil(Math.random() * 10));
  };
}

class Cow extends AnimalAbs {
  makeSound(): void {
    console.log('listen: mow..');
  }
}
let yjs1: AnimalAbs;
yjs1 = new YanjingSnake('眼镜蛇');
yjs1.makeSound();
yjs1.move();

let cow1: AnimalAbs
// cow1 = new AnimalAbs(); // Error
cow1 = new Cow('母牛');
cow1.makeSound();
cow1.move();