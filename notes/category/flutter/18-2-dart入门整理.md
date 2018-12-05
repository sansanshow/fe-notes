## classes
### Getters and setters
`Getters` 和 `setters` 是用来设置和访问对象属性的特殊 函数。每个实例变量都隐含的具有一个 `getter，` 如果变量不是 `final` 的则还有一个 `setter。` 你可以通过实行 `getter` 和 `setter` 来创建新的属性， 使用 `get` 和 `set` 关键字定义 `getter` 和 `setter：`

### 抽象函数 & 抽象类

> 抽象函数

```
// 抽象函数 
abstract class Person {
  void eat();
}
// 抽象函数的实现
class Student extends Person {
  @override
  void eat() {
    // TODO: implement eat
    print('Student eat...');
  }
}
```
### Overridable operators（可覆写的操作符）

示例：
```
// 可覆盖的操作符

class Point {
  final num x;
  final num y;
  const Point(this.x, this.y);

  Point operator + (Point other) {
    return new Point(x + other.x, y + other.y);
  }
  @override
  String toString() {
    return 'Ponit[x: $x, y: $y]';
  }
}

var p1 = new Point(1, 2);
var p2 = new Point(-2, 3);
var p3 = p1 + p2;
print(p3);  // Ponit[x: -1, y: 5]
```
### 继承

Invoking a non-default superclass constructor（调用超类构造函数）
默认情况下，子类的构造函数会自动调用超类的 无名无参数的默认构造函数。 超类的构造函数在子类构造函数体开始执行的位置调用。 如果提供了一个 initializer list（初始化参数列表） ，则初始化参数列表在超类构造函数执行之前执行。 下面是构造函数执行顺序：

1. initializer list（初始化参数列表）   
2. superclass’s no-arg constructor（超类的无名构造函数）   
3. main class’s no-arg constructor（主类的无名构造函数）   

如下代码：
```
// 父类
class Man {
  final String name;
  Man(this.name); // 
}

class SuperMan extends Man {
  final String name;
  var age;
  SuperMan(this.name) : super(name); // 注意这里super(name) 原本是调用父类默认的构造函数，但是父类有一个已经声明过的构造函数，所以只能调用父类的构造函数super(name);

  SuperMan.fromJson(json)
    : name = json['name'],
      super('') {
    age = json['age'];
  }
}
```