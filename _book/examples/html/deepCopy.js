function deepCopy(src, dest) {
    dest = dest || {}
    for(var key in src) {
        if(typeof src[key] === 'object') {
            if(src[key].constructor === Array) {
                dest[key] = []
            } else {
                dest[key] = {}
            }
            arguments.callee(src[key], dest[key])
        } else {
            dest[key] = src[key]
        }
    }
    return dest
}

var A = {
    a: 1,
    b: {
        c: {
           d: [1, 2, 3]
        }
    }
};

var b = deepCopy(A);

//密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
var pPattern = /^.*(?=.{8,16})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;


var pPattern = /^.*(?=.{8,16})(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*? ]).*$/;

//输出 true
console.log("=="+pPattern.test("iFat3#"));