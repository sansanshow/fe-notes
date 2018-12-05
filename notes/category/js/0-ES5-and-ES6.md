# ES6部分
## class
### class 静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法`不会被实例继承`，而是直接通过类来调用，这就称为“静态方法”。 

```
class Foo {
  static classMethod() {
    this.otherMethod()
    return 'hello';
  }
  static otherMethod() {
      console.log('hello other')
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。
> 假如this指的得是类，是不是静态方法中this就只能调用静态方法？？？

是的.    
this指向类，类上面没有此方法，就会报错
```
class Foo {
	static bar() {
    	this.baz()
	}
	baz() {
    	console.log('hello')
	}
}

Foo.bar()
>> Uncaught TypeError: this.baz is not a function
    at Function.bar (<anonymous>:3:11)
    at <anonymous>:1:5
```

静态方法可以与非静态方法重名
```
class Foo {
	static bar() {
    	this.baz()
	}
	static baz() {
    	console.log('hello')
	}
  baz() {
    	console.log('world')
	}
}

Foo.bar() // 'hello'
```

### Class 的静态属性
静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
```
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```

目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。