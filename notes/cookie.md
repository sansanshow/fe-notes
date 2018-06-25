
> ?????     

chrome浏览器在本地获取不到cookie。必须在服务器上才可以。如果是本地的话，你可以放到local的www目录下面。

Google Chrome只支持在线网站的cookie的读写操作，对本地html的cookie操作是禁止的。所以下面的代码如果你写在一个本地的html文件中，将弹出的对话框内容为空。


第一种方式（w3c）
```
//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
//清除cookie  
function clearCookie(name) {  
    setCookie(name, "", -1);  
}  
function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}
checkCookie();
```

第二种方式（正则）
```
/写cookies
function setCookie(c_name, value, expiredays){
 　　　　var exdate=new Date();
　　　　exdate.setDate(exdate.getDate() + expiredays);
　　　　document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
 　　}
 
//读取cookies
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return (arr[2]);
    else
        return null;
}

//删除cookies
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
```

第三种
```
function addCookie(objName, objValue, objHours){//添加cookie 
                var str = objName + "=" + escape(objValue); 
                if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失 
                    var date = new Date(); 
                    var ms = objHours * 3600 * 1000; 
                    date.setTime(date.getTime() + ms); 
                    str += "; expires=" + date.toGMTString(); 
                } 
                document.cookie = str; 
                alert("添加cookie成功"); 
            } 
            
            function getCookie(objName){//获取指定名称的cookie的值 
                var arrStr = document.cookie.split("; "); 
                for (var i = 0; i < arrStr.length; i++) { 
                    var temp = arrStr[i].split("="); 
                    if (temp[0] == objName) 
                        return unescape(temp[1]); 
                } 
            } 
            
            function delCookie(name){//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间 
                var date = new Date(); 
                date.setTime(date.getTime() - 10000); 
                document.cookie = name + "=a; expires=" + date.toGMTString(); 
            } 
            
            function allCookie(){//读取所有保存的cookie字符串 
                var str = document.cookie; 
                if (str == "") { 
                    str = "没有保存任何cookie"; 
                } 
                alert(str); 
            } 
            
            function $(m, n){ 
                return document.forms[m].elements[n].value; 
            } 
            
            function add_(){ 
                var cookie_name = $("myform", "cookie_name"); 
                var cookie_value = $("myform", "cookie_value"); 
                var cookie_expireHours = $("myform", "cookie_expiresHours"); 
                addCookie(cookie_name, cookie_value, cookie_expireHours); 
            } 
            
            function get_(){ 
                var cookie_name = $("myform", "cookie_name"); 
                var cookie_value = getCookie(cookie_name); 
                alert(cookie_value); 
            } 
            
            function del_(){ 
                var cookie_name = $("myform", "cookie_name"); 
                delCookie(cookie_name); 
                alert("删除成功"); 
            } s
```