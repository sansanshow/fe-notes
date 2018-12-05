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