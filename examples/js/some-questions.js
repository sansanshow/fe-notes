/**
 * 将一个数组打乱顺序
 */
// 获取一个长度len的数组
function getArray (len = 10){
  var arr = []
  for (let index = 1; index <= len; index++) {
    arr.push(index);
  }
  return arr;
}

// Math.random() & Array.sort排序 打乱 -- 不推荐
function to_un_order_array (arr) {
  let newArr = arr;
  newArr.sort(() => {
    return Math.random() > 0.5 ? 1 : -1;
  });
}
var arr = getArray()

let newArr = to_un_order_array(arr);
console.log(arr.toString())

// 洗牌 --- 推荐
function shuffle(arr) {
  let m = arr.length;
  let t;
  let i;
  while (m) {
    i = Math.floor(Math.random() * m--)
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
}

arr = getArray()
shuffle(arr)
console.log(arr.toString())


// 验证
function doStatistics (sortUnOrderfunc) {
  // 生成统计数组
  let two_dim_arr = {}
  for (let i = 1; i <= 10; i++) {
    two_dim_arr[i] = Array(10)
  }

  // 循环10000次打乱
  for (let index = 0; index < 10000; index++) {
    let arr = getArray();
    sortUnOrderfunc(arr);
    arr.forEach((i, index) => {
      let countArr = two_dim_arr[i];
      if (countArr[index]) {
        countArr[index] += 1;
      } else {
        countArr[index] = 1;
      }
    })
  }

  console.log(two_dim_arr)
}

// 验证
doStatistics(to_un_order_array);
doStatistics(shuffle);