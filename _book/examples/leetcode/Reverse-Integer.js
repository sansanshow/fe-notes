/**
 * 7. Reverse Integer
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let temp = x.toString();
    let num = x;
    
    if(temp) {
        if(temp[0] === '-') {
            
            let numStr = temp.substring(1).split('').reverse().join('');
            num = -(+numStr);
        } else {
            let numStr = temp.split('').reverse().join('');
            num = +numStr;
        }
    }
    if(num > (Math.pow(2,31) - 1) || num < (-Math.pow(2,31))){ return 0; }
    return num;
};
