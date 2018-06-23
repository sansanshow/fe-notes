
// https://juejin.im/post/5ace1b306fb9a028c71ed009
var cookieObj = {
    add: function(key, val, seconds, domain = '') {
        var expire = '';
        if(seconds != null) {
            expire = new Date(new Date().getTime() + seconds * 1000);
            espire = ";espires=" + espire.toGMTString();
        }

        document.cookie = key + '=' + escape(val) + expire + ';path:/;domain=' + domain
    },
    get: function(key) {
        if(document.cookie.length > 0) {
            var start = document.cookie.indexOf(key + '=');
            if(start != -1) { // 存在 key
                var end =  document.cookie.indexOf(';', start);
                var hasSymbol = true
                if(end === -1) {
                    end = document.cookie.length;
                    hasSymbol = false
                }
                var keyVal = unescape(document.cookie.substr(start, end))
                var kv_start = (key + '=').length
                var kv_end = hasSymbol ? keyVal.length - 1 : keyVal.length
                keyVal.substr(kv_start, kv_end)
            }
        }
    }
}