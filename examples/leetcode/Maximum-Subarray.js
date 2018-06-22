/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let resArr = [];
    let subLen = 1;
    let len = nums.length;
    for(subLen = 1;subLen <= len; subLen++){
        for (let i = 0; i< len - subLen + 1 ; i++) {
            let res = nums[i];
            for(let j = 1;j < subLen; j++){
                res += nums[i+j] 
            }
            resArr.push(res);
        }
    }
    resArr.sort(function(a,b){
        return a-b;
    });
    return resArr[resArr.length-1];
};