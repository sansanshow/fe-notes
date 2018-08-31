/**
 * javascript语言精粹
 */

// 4.12 模块化
var maker = function() {
    var prefix = ''
    var seq = 0
    return {
        set_prefix: function(val) {
            prefix = String(val)
        },
        set_seq: function(s) {
            seq = s
        },
        gensym: function() {
            return prefix+seq
        }
    }
}

var onemaker = maker()
onemaker.set_prefix('PRE_')
onemaker.set_seq(100)
console.log(onemaker.gensym()) // 输出 `PRE_1001`

// 重新覆盖 set_prefix ，访问不到prefix
onemaker.set_prefix = function(v){
    prefix = v
}
onemaker.set_prefix('PRE2_') // 设置不成功，访问不到prefix
onemaker.set_seq(1001)  
console.log(onemaker.gensym()) // 输出 `PRE_1001`, 并不是 'PRE2_1001'

// 4.14 记忆
/**
 * 函数可以用对象去记忆先前操作的结果，从而能避免无谓的运算，这种优化被称为记忆（memoization）
 */

/**
 * 斐波那契队列实现
 */
var count = 0
var fibonacci = function(n) {
    count ++
    return n < 2 ? n : arguments.callee(n-1) + arguments.callee(n-2)
}

// 测试函数
count = 0;
for (let index = 0; index <= 10; index++) {
    console.log(`${index}: ${fibonacci(index)}`)
}

console.log(count) // 453。说明函数被调用453次，假如对值进行记忆存储，就会减少调用此时
    // 我们实际调用11次，但是自身调用了442次

/**
 *  斐波那契队列实现 -- 优化
 */
var fibonacciImprove = function() {
    var memo= [0, 1];
    var fibonacci = function(n) {
        var result = memo[n];
        count++;
        if(typeof result !== 'number') {
            result = arguments.callee(n-1) + arguments.callee(n-2);
            memo[n] = result;
        }
        return result
    }
    return fibonacci
}()

// 测试函数实现
count = 0;
for (let index = 0; index <= 10; index++) {
    console.log(`${index}: ${fibonacciImprove(index)}`)
}

console.log(count) // 29函数只被调用29次， 自身调用29-11 = 18次
// 再次执行
count = 0;
for (let index = 0; index <= 10; index++) {
    console.log(`${index}: ${fibonacciImprove(index)}`)
}

console.log(count) // 11 因为之前的值被保存了，所以直接给出值。 自身调用0次

/**
 * 第5章 继承
 */

// 5.4 函数化
// ---- 需要重新理解

// 5.5 部件
// ---- 需要重新理解

var arr = []
arr.splice(1,2)

function isArray(val) {
    return val && typeof val === 'object' && 
        typeof val.length === 'number' && 
        val.propertyisenumerable('length')
}