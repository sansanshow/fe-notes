class Person {
  String firstName;
  Person() {
    print('in default Person');
  }
  Person.fromJson(Map data) {
    print('in Person');
  }
}

class Employee extends Person {
  // Person does not have a default constructor;
  // you must call super.fromJson(data).
  Employee.fromJson(Map data) : super() {
    print('in Employee');
  }
}

class Point {
  num x;
  num y;

  Point(this.x, this.y);

  // 在构造函数体执行之前除了可以调用超类构造函数之外，还可以 初始化实例参数。 使用逗号分隔初始化表达式。
  // Initializer list sets instance variables before
  // the constructor body runs.
  Point.fromJson(Map jsonMap)
      : x = jsonMap['x'],
        y = jsonMap['y'] {
    
    print('In Point.fromJson(): ($x, $y)');
  }
}

// 常量构造函数
/**
 * 如果你的类提供一个状态不变的对象，你可以把这些对象 定义为编译时常量。
 * 要实现这个功能，需要定义一个 const 构造函数， 并且声明所有类的变量为 final。
 */
class ImmutablePoint {
  final num x;
  final num y;
  const ImmutablePoint(this.x, this.y);
  static final ImmutablePoint origin =
      const ImmutablePoint(0, 0);
}


// 工厂构造函数
class Logger {
  final String name;
  bool mute = false;

  // _cache is library-private, thanks to the _ in front
  // of its name.
  static final Map<String, Logger> _cache =
      <String, Logger>{};

  factory Logger(String name) {
    if (_cache.containsKey(name)) {
      print('Logger<${name}> from _cache');
      return _cache[name];
    } else {
      final logger = new Logger._internal(name);
      _cache[name] = logger;
      print('Logger<${name}> is new');
      return logger;
    }
  }

  Logger._internal(this.name) {
    print('internal: New a logger');
  }

  void log(String msg) {
    if (!mute) {
      print(msg);
    }
  }
}



main() {
  var emp = new Employee.fromJson({});
  var p1 = new Point.fromJson({"x": 1, "y": 2});
  var ip1 = const  ImmutablePoint(1,2);
  var ip2 = const  ImmutablePoint(1,2);
  print(ip1 == ip2);

  var logger = new Logger('UI');
  logger.log('Button Clicked!');
  var logger2 = new Logger('UI');
  logger2.log('Button Clicked again!');

  // Prints:
  // in Person
  // in Employee
  if (emp is Person) {
    // Type check
    emp.firstName = 'Bob';
  }
  (emp as Person).firstName = 'Bob';
}