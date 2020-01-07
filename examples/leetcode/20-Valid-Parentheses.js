/**
 * @param {string} s
 * @return {boolean}
 * success
 */
var isValid = function(s) {
  if(!s) return true;
  if(s.length % 2 === 1) return false;
  let map = {
      ')': '(',
      ']': '[',
      '}': '{'
  }
  let len = s.length;
  let stack = [];
  for (let i = 0; i < len; i++) {
    let currStr = s.charAt(i);
    if (i === 0) {
      stack.push(currStr)
    } else {
      let prevStr = s.charAt(i - 1);
      if (prevStr === map[currStr]) { // 上一个 是当前的闭合
        stack.pop();
      } else {
        stack.push(currStr); // 压入栈
      }
    }
  }
  if (stack.length === 0) {
    return true;
  } else if (stack.length === len) {
    return false;
  } else {
    return arguments.callee(stack.join(''));
  }
};
/**
 * falid
 */
var isValid = function(s) {
  if(!s) return true;
  if(s.length % 2 === 1) return false;
  let map = {
      ')': '(',
      ']': '[',
      '}': '{'
  }
  let lefts = Object.values(map);
  let rights = Object.keys(map);
  let leftNums = 1; 
  for (let i = 0; i < len; i++) {
    let currStr = s.charAt(i);
    if (i > 1) {
      if (lefts.includes(currStr)) { // 属于左边
        leftNums ++;
      } else { // 属于右边的
        let prev = s.charAt(i - 1);
        prev
      }
      
    }
  }
};