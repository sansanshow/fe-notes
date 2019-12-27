/**
 * 8. String to Integer (atoi)
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    let num = 0
    let matches =  str.trim().match(/(^-{0,1}|^\+{0,1})\d{1,}/g);
    if(matches && matches.length > 0) {
        num = +(matches[0]);
        
    }
    // 
    if(num > Math.pow(2, 31) - 1) {
        num = Math.pow(2, 31) - 1;
    } else if (num < -Math.pow(2, 31)) {
        num = -Math.pow(2, 31);
    }
    return num;
 };