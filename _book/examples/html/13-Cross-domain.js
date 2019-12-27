/**
 * Cross domain
 * 跨域的实现
 */

 //1. 图片ping或script标签跨域
function imgPing(url) {
    var img = new Image();
    img.src = url;
    img.onload = function () {
        console.log(`img-url:${url}...success`)
    }
    img.onerror = function () {
        console.error(`img-url:${url}...faild`)
    }
}

function addScriptTags (url) {
    var script = document.createElement('script');
    script.src = url;
    script.
}

