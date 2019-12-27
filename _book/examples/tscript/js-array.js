
// 展开数组的 n 种方法
/**
 * 原数组： [7, [6, [5, [4, [3, 2]]]], 1]
 * 最终结果： [7, 6, 5, 4, 3, 2, 1]
 */
let ary = [7, [6, [5, [4, [3, 2]]]], 1] // 最终结果[7, 6, 5, 4, 3, 2, 1]


function flat_concat(ary) {
  let clone = JSON.parse(JSON.stringify(ary));
  while (clone.some(Array.isArray)) {
    clone = [].concat(...clone);
  }
  return clone;
}

// reduce 方式展开
function flat_reduce(ary = []) {
  /**
    1、previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
    2、currentValue （数组中当前被处理的元素）
    3、index （当前元素在数组中的索引）
    4、array （调用 reduce 的数组）
   */
  return ary.reduce((pre, curr, index, arr) => {
    return pre.concat(Array.isArray(curr) ? flat_reduce(curr) : curr)
  }, [])
}

/**
 * flat_replace_split
 * @param {*} ary 
 */
function flat_replace_split(ary) {
  let str = JSON.stringify(ary);
  return str.replace(/(\[|\])/g, '').split(',')
}

/**
 * replace & JSON.parse()
 * @param {*} ary 
 */
function flat_replace_JSON(ary) {
  let str = JSON.stringify(ary);
  return JSON.parse(`[${str.replace(/(\[|\])/g, '')}]`)
}
/**
 * es6中方法
 * @param {*} ary 
 */
function flat_es6_flat(ary) {
  // return ary.flat(Infinity)
}
/**
 * 递归实现
 */
function flat_digui(ary) {
  let res = [];
  let fn = (arr) => {
    for(let i = 0; i < arr.length; i++) {
      let item = arr[i];
      if (Array.isArray(item)) {
        fn(item);
      } else {
        res.push(item);
      }
    }
  }
  fn(ary);
  return res;
}



console.log('1---flat_digui----------------')
let ret6 = flat_digui(ary);
console.log('origin>>', ary);
console.log('after>>', ret6);

console.log('2---flat_es6_flat----------------')
let ret5 = flat_es6_flat(ary);
console.log('origin>>', ary);
console.log('after>>', ret5);

console.log('3---flat_replace_JSON----------------')
let ret4 = flat_replace_JSON(ary);
console.log('origin>>', ary);
console.log('after>>', ret4);

console.log('4---flat_replace_split----------------')
let ret3 = flat_replace_split(ary);
console.log('origin>>', ary);
console.log('after>>', ret3);

console.log('5---flat_reduce----------------')
let ret2 = flat_reduce(ary);
console.log('origin>>', ary);
console.log('after>>', ret2);

console.log('6---flat_concat----------------')
let ret1 = flat_concat(ary);
console.log('origin>>', ary);
console.log('after>>', ret1);
