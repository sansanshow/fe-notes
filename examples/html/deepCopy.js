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