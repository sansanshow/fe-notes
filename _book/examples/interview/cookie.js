
// https://juejin.im/post/5ace1b306fb9a028c71ed009
/**
 * cookie的读取操作
 */
var cookieObj = {
    /**
     * @params {} key 键
     * @params {} val 值
     * @params {}  seconds 秒
     * @params {}  domain 作用域
     * 
     */
    add: function(key, val, seconds, domain = '') {
        var expire = '';
        if(seconds != null) { 
            expire = new Date(new Date().getTime() + seconds * 1000);
            expire = ";expires=" + expire.toGMTString();
        }

        document.cookie = key + '=' + escape(val) + expire + ';path:/;domain=' + domain;
    },
    get: function(key) {
        if(document.cookie.length > 0) {
            var start = document.cookie.indexOf(key + '=');
            if(start != -1) { // 存在 key
                start = start + key.length + 1; // 加上（‘key=’）的长度
                var end =  document.cookie.indexOf(';', start);
                if(end === -1) { // 没找到，说明到达最后一个了
                    end = document.cookie.length;
                }
                var keyVal = document.cookie.substring(start, end);
                // var kv_start = (key + '=').length
                // var kv_end = keyVal.length
                // // var kv_end = hasSymbol ? keyVal.length - 1 : keyVal.length
                return keyVal;
            }
        }
        return ""
    }
}
