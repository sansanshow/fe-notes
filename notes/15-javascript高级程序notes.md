## 第六章：面向对象
### 
1. Object.defineProperty() - 一次只能一个属性
在定义访问器属性的时候：getter, setter, configurable, eumerable
如果只定义了getter, 则setter是不允许的，就是不能写，写入会被忽略，在严格模式下，会报错。没有指定getter的也不能读，读取会返回undefined
2.  Object.defineProperties() - 一次定义多个属性

第一个是对象，第二个是要定义的对象的属性的操作

### 6.2 创建对象
#### 1. 工厂模式
```
 function createPerson(name, age, job){
    var obj = new Object()
    obj.name = name
    obj.age = age
    obj.job = job
    obj.sayName = function (){
        alert(this.name)
    }
    return obj
}
```
**缺点：**
1. 没有解决对象识别的问题（即不知道对象是什么类型）

#### 2. 构造函数模式
```
function Person(name, age, job) {
    this.name = name
    this.age = age
    this.job = job
    this.sayName = function (){
        alert(this.name)
    }
}
```
**缺点：**
1. 对象内的方法不是同一个方法，每个实例方法都会重新创建一次    
解决： 可以将方法移动到构造函数。 但是在全局商定义函数只能被某个对象调用，又不符合全局函数的意义了

```
function Person(name, age, job) {
    this.name = name
    this.age = age
    this.job = job
    this.sayName = sayName
}
function sayName(){
    alert(this.name)
}
```

2. 当全局方法定义很多的时候，会使得构造函数的封装性毫无意义可言

可以使用原型模式构造函数


#### 3. 原型模式
```
function Person() {

}

Person.prototype.name = 'Pserson2 default name',
Person.prototype.age = 21,
Person.prototype.job = 'Software Engineer',
Person.prototype.sayName = function() {
    alert(this.name)
}
```
`hasOwnProperty(key)` 当实例上面存在有该属性时，就会返回true，实例上面不存在则返回false---这个方法只能判断实例上是否有某属性   

`name in obj` 则可以判断在原型或者实例上是否存在该属性----这个方法能判断实例或原型上是否有某属性

in 操作在能够访问属性操作时返回true
两者结合，可以判断原型上是否存在某个属性

```
function  hasProtoTypeProperty(object, name){
    return !object.hasOwnProperty(name) && (name in object)
}

```

`Object.keys(obj)` 返回对象的实例属性  ，就时某个实例定义过的属性，即使时覆盖的原型属性

**为了更好的封装原型的功能，会使用一个包含所有属性及方法的对象来覆盖原型**如下代码
```
function Person() {

}
Person.prototype = { 
    name: 'Pserson2 default name',
    age: 21,
    job: 'Software Engineer',
    sayName: function() {
        alert(this.name)
    }
}
```
这样的后果，使得`Person.prototype` 上的`constructor`丢失原来的指向，不会指向`Person`

改进：
```
Person.prototype = { 
    constructor: Person,  // 这样constructor 重新指向Person 
    name: 'Pserson2 default name',
    age: 21,
    job: 'Software Engineer',
    sayName: function() {
        alert(this.name)
    }
}
```
但是重设`constructor`方式带来的后果就是，使得`constructor`的特性`[[Enumerable]]` 被设置为`true`。正常情况下`constructor`的特性`[[Enumerable]]` 的值为`false`
**缺点：**
最大的问题是共享的本质，基本类型的属性没有影响。当属性值为引用类型的时候，因为时地址引用，修改某个对象的值，就会修改所有实例该属性的值。

所以就出现了 `组合使用构造函数模式和原型模式`

#### 4. 组合使用构造函数模式和原型模式

> 使用方法：
- 构造函数模式定义实例属性。

- 原型模式定义方法及共享的属性

这样，每个实例就会有自己的一份实例属性，但同时又共享着对方法的引用。

```
function Person() {
    this.name = 'Pserson2 default name',
    this.age = 21,
    this.job = 'Software Engineer',
}

Person.prototype.sayName = function() {
    alert(this.name)
}
```
**缺点：**

#### 5. 动态原型模式

```
function Person() {
    this.name = 'Pserson2 default name',
    this.age = 21,
    this.job = 'Software Engineer'

    if(typeof this.sayName != 'function') {
        Person.prototype.sayName = function() {
            alert(this.name)
        }
    }
}
```
**缺点：**   
> 不能使用对象字面量定义原型。
> 如果在已经创建了实例的情况下重写原型，就会切断现有实例跟原型之间的关系
#### 6. 寄生构造函数模式
```
function Person(name, age, job){
    var obj = new Object()
    obj.name = name
    obj.age = age
    obj.job = job
    obj.sayName = function (){
        alert(this.name)
    }
    return obj
}
```
**缺点：**


#### 7. 稳妥构造函数模式    

没有公共属性，而且其方法也不引用this的对象。

```
function Person(name, age, job){
    var obj = new Object()
    // 在这里定义私有变量和函数
    obj.sayName = function (){
        alert(name)
    }
    return obj
}
```

使用下面的方式调用构造函数：

```
var person = Person('Greg', 18, 'Software Engineer');
person.sayName(); // 'Greg'
```

**缺点：**


### 6.2 继承

#### 原型继承

```
function SuperType() {
    this.property = true
}

SuperType.prototype.getSuperValue = function() {
    return this.property
}


// 子类
function SubType() {
    this..subproperty = false
}

// 继承 
SubType.prototype = new Subtype()

SubType.prototype.getSubValue = function() {
    return this.subproperty
}

```

这样就实现了原型链继承。

**需要注意**

- 子类的原型方法，必须在原型继承之后。原型继承实际上是覆盖子类原型。

- 子类方法拓展不能使用字面量，因为会再次覆盖继承的原型。导致继承失效。

**缺点**
- 当在超类中`SuperType` 中加入一个引用类型的属性，则SubType的所有实例都引用同一个引用类型值，会造成引用类型共享。

#### 借用构造函数继承
```
 function SuperType( name= 'Greg') { // 默认值 es6写法
    this.name = name
    this.colors = ['red', 'blue']
    this.somFunc = function() {
        alert('somFunc')
    }
}
SuperType.prototype.sayName = function() {
    alert(this.name)
}

function SubType() {
    SuperType.call(this) //

    this.age = 18
}

SubType.prototype.sayAge = function() {
    alert(this.age)
}

var sub = new SubType()
sub.sayAge() // 18
sub.sayName() // 报错--Uncaught TypeError: sub.sayName is not a function
sub.somFunc()  // 'somFunc'
```
**特点**
1. **借用构造函数继承**，可以继承超类对象的属性，`（缺点）`但是不能继承超类对象原型中的属性及方法

2. **借用构造函数继承**方法，可以使超类的属性复制一份，各自拥有一份超类属性。

3. **借用构造函数继承**`可以传递参数`，在调用`SuperType.call(this)`的时候，比如
```
//....省略

function SubType() {
    SuperType.call(this, 'Customer Name')

    this.age = 18
}

```

4. `（缺点）`**借用构造函数继承** 方法只能在构造函数中定义。方法复用没有任何意义



#### 组合构造函数继承

**组合构造函数继承**,又叫伪经典继承，使将`原型链继承`与`借用构造函数继承`相结合的继承方式
```
// 超类
function SuperType(name = 'Greg') {
    this.name = name
    this.colors = ['red', 'blue']
}
SuperType.prototype.sayName = function(){
    alert(this.name)
}

// 子类
function SubType(name, age) {
    // 继承属性
    SuperType.call(this, 'Nick')

    // 定义子类的属性
    this.age = 18
}

// 继承方法
SubType.prototype = new SuperType()
// 定义子类 方法
SubType.prototype.sayAge = function () {
    alert(age)
}
```
