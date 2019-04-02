### 1. 截取url 参数为对象
```
function parse_url(url){
    var pattern = /(\w+)=(\w+)/ig;
    var parames = {};
    url.replace(pattern, function(a, b, c){
        parames[b] = c;
    });
    return parames;
}
```

```

/*
 * somereq?a=1&b=2 => {'a': 1, 'b': 2}
 */
function queryToJson (url) {
    var query = url.substr(url.lastIndexOf('?') + 1)
    var params = query.split('&')
    var len = params.length
    var result = {}
    var i = 0
    var key, value, item, param
    for (; i < len; i++) {
        if (!params[i]) {
            continue
        }
        param = params[i]
        var eqIndex = param.indexOf('=')
        key = param.substring(0, eqIndex)
        value = param.substring(eqIndex + 1)
        item = result[key]
        if (typeof item === 'undefined') {
            result[key] = value
        } else {
            result[key] = [item, value]
        }
    }
    return result
}
exprot default queryToJson
```

## 千分位分隔符
```
/**
 *num 要分隔的数字（必填）
 *n 保留的小数位数（可选）
 *symbol 分隔数字使用的符号（可选，默认为","）
 */ 
function splitNum(num,n,symbol) {
    if(!num)throw new Error('splitNum需要传入一个待转换的数据');
    if(typeof num!=='number')throw new TypeError('num参数应该是一个number类型');
    if(n<0)throw new Error('参数n不应该小于0');
    var hasDot=parseInt(num)!=num;//这里检测num是否为小数，true表示小数
    var m=(n!=undefined&&n!=null)?n:1;
    num=m==0?num.toFixed(m)+'.':hasDot?(n?num.toFixed(n):num):num.toFixed(m);
    symbol=symbol||',';
    num=num.toString().replace(/(\d)(?=(\d{3})+\.)/g,function(match, p1,p2) {
        return p1 + symbol;
    });
    if(n==0||(!hasDot&&!n)){//如果n为0或者传入的num是整数并且没有指定整数的保留位数，则去掉前面操作中的小数位
        num=num.substring(0,num.indexOf('.'));
    }
    return num;
}
```