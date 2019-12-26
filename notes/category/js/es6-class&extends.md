https://segmentfault.com/a/1190000015565616

```
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
    super(name);
  }
  // 重写一个方法
  stop () {
    super.stop();
    console.log(`${this.name} stopped in childs!!`);
  }
  hide () {
    console.log(`${this.name} hide.`);
  }
}

let rabbit1 = new Rabbit();
rabbit1.run(100);
rabbit1.stop();
rabbit1.hide();
```

### 箭头函数无 super
正如在 arrow-functions 一章中提到，箭头函数没有 super。

它会从外部函数中获取 super。例如：
```
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // call parent stop after 1sec
  }
}
```

### 静态方法继承

```
class Animal {
  constructor (name, speed) {
    this.speed = speed;
    this.name = name || 'Animal';
  }

  run (speed) {
    this.speed = speed;
    console.log(`${this.name} run with speed ${this.speed}.`);
  }

  stop () {
    console.log(`${this.name} stopped !!`);
  }
  // 静态方法
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
}


class Rabbit extends Animal {
  constructor (name) {
    super(name);
  }
  // 重写一个方法
  stop () {
    super.stop();
    console.log(`${this.name} stopped in childs!!`);
  }
  hide () {
    console.log(`${this.name} hide.`);
  }
}

let rabbits = [
  new Rabbit("White Rabbit", 10),
  new Rabbit("Black Rabbit", 5)
];

rabbits.sort(Rabbit.compare);

rabbits[0].run(); // Black Rabbit runs with speed 5.

```