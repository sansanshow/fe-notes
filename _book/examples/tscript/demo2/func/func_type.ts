
let add: (base: number, increase: number) => number =
function(x: number, y: number): number { return x + y; };

console.log(add(1, 2));

let add2 =
function(x: number, y: number): number { return x + y; };

console.log(add2(1, 2));

// 函数参数

/**
 * note:
 * ts 必须严格传参
 */
function buildName(firstName: string, lastName: string) {
  return firstName + '·' + lastName;
}

// let name1 = buildName('Bob'); // Error
let name2 = buildName('Bob', 'Brown');


/**
 * 可选参数必须跟在必须参数后面
 */
function buildName2(firstName: string, lastName?: string) {
  if(lastName) {
    return firstName + '·' + lastName;
  } else {
    return firstName
  }
}
let name3 = buildName2('Bob'); // Ok
let name4 = buildName2('Bob', 'Brown');
// let name5 = buildName2('Bob', 'Brown', 'ThreeParams'); // Error 即使有可选参数也不能超出最大 参数数量 期待 1-2个， 实际3个 所以报错

// console.log(name1, name2);

/**
 * 默认参数值
 */

function buildName3(firstName: string, lastName = 'Ma') {
  return firstName + '·' + lastName;
}
function buildName32(firstName = 'Jack', lastName: string) {
  return firstName + '·' + lastName;
}

let name6 = buildName3('Bob'); // Ok
// tip: 说明 默认参数放到最后才可以不传
// let name32 = buildName32('Bob'); // Error  Expected 2 arguments, but got 1. 

let name7 = buildName3('Bob', 'Brown'); // OK
// let nameMid = buildName3('Bob', 'Brown', 'jack'); // error 超出了 参数数量

/**
 * 默认值 + 可选参数
 * 
 * 可选参数 
 */
// normal: 可选参数放在最后 即：必填参数--> 默认参数--> 可选参数
function buildName4(firstName: string, lastName = 'Ma', mid?: string) {
  return firstName + `·${mid ? `${mid}·` : ''}` + lastName;
}
// 可选参数在 默认参数前 即：必填参数-->可选参数-->默认参数
/**
 * 可选参数 可以放在 带有默认值的参数 前 但不能放在 任何一个 必填参数前
 */
function buildName5(firstName: string, mid?: string, lastName = 'Ma', la="ma") {
  return firstName + `·${mid ? `${mid}·` : ''}` + lastName;
}

// 可选参数放在最后 即：必填参数--> 默认参数--> 可选参数
function buildName6(firstName = 'Jack', lastName: string, mid?: string) {
  return firstName + `·${mid ? `${mid}·` : ''}` + lastName;
}

let name8 = buildName4('Bob'); // Ok
let name9 = buildName4('Bob', 'Brown'); // OK
let nameMid2 = buildName4('Bob', 'Brown', 'jack'); // OK

console.log(name8, name9, nameMid2);


let name51 = buildName5('Bob'); // Ok
let name52 = buildName5('Bob', 'Brown'); // OK
let name53 = buildName5('Bob', 'Brown', 'jack'); // OK
console.log('buildName5:', name51, name52, name53)
/**
 * Expected 2-3 arguments, but got 1 
 */
// let name61 = buildName6('Bob'); // Error Expected 2-3 arguments, but got 1

let name62 = buildName6('Bob', 'Brown'); // OK
let name63 = buildName6('Bob', 'Brown', 'jack'); // OK