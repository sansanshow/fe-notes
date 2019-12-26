# 手机原生 Input 上传图片 方向问题
## 1. 背景
> 在 iPhone 下上传的照片会横着展示。 其实是拍照方向的问题，iPhone正确的手机拍照方式是横屏的，但一般我们都是竖屏拍照等于照相机反转了90度，出来的照片当然是反转90度，上传后就会出现横着的问题

也就是说 iphone 设备竖着拍照其实 是 顺时针旋转了90度的照片

### 解决
使用 `exif-js` 解决

中文文档：http://code.ciaoca.com/javascript/exif-js/   
github: https://github.com/exif-js/exif-js/

## 使用
```
npm install exif-js / yarn add exif-js
```
或者直接引入
```
<script src="https://somecdn.com/exif.js"></script>
```

HTML
```
<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
   <title>图片上传</title>
   <script type="text/javascript" src="js/jquery-1.8.3.js"></script>
   <script type="text/javascript" src="js/exif.js" ></script>
   <script type="text/javascript" src="js/uploadPicture/uploadImage.js" ></script>
</head>
<body>
   <div style="height: 50px; line-height: 50px;text-align: center;border-bottom: 1px solid #171E28;">
       上传图片:
       <input type="file" accept="image/*" id="uploadImage" capture="camera" onchange="selectFileImage(this);" />
   </div>
   <div style="margin-top: 10px;">
       <img alt="preview" src="" id="myImage"/>
   </div>
</body>
</html>
```

JS
```
function selectFileImage(fileObj) {
    var file = fileObj.files['0'];
    //图片方向角 added by lzk
    var Orientation = null;
    
    if (file) {
        console.log("正在上传,请稍后...");
        var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
        if (!rFilter.test(file.type)) {
            //showMyTips("请选择jpeg、png格式的图片", false);
            return;
        }
        // var URL = URL || webkitURL;
        //获取照片方向角属性，用户旋转控制
        EXIF.getData(file, function() {
           // alert(EXIF.pretty(this));
            EXIF.getAllTags(this); 
            //alert(EXIF.getTag(this, 'Orientation')); 
            Orientation = EXIF.getTag(this, 'Orientation');
            //return;
        });
        
        var oReader = new FileReader();
        oReader.onload = function(e) {
            //var blob = URL.createObjectURL(file);
            //_compress(blob, file, basePath);
            var image = new Image();
            image.src = e.target.result;
            image.onload = function() {
                var expectWidth = this.naturalWidth;
                var expectHeight = this.naturalHeight;
                
                if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                    expectWidth = 800;
                    expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
                } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                    expectHeight = 1200;
                    expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
                }
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = expectWidth;
                canvas.height = expectHeight;
                ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                var base64 = null;
                //修复ios
                if (navigator.userAgent.match(/iphone/i)) {
                    console.log('iphone');
                    //alert(expectWidth + ',' + expectHeight);
                    //如果方向角不为1，都需要进行旋转 added by lzk
                    if(Orientation != "" && Orientation != 1){
                        alert('旋转处理');
                        switch(Orientation){
                            case 6://需要顺时针（向左）90度旋转
                                alert('需要顺时针（向左）90度旋转');
                                rotateImg(this,'left',canvas);
                                break;
                            case 8://需要逆时针（向右）90度旋转
                                alert('需要顺时针（向右）90度旋转');
                                rotateImg(this,'right',canvas);
                                break;
                            case 3://需要180度旋转
                                alert('需要180度旋转');
                                rotateImg(this,'right',canvas);//转两次
                                rotateImg(this,'right',canvas);
                                break;
                        }       
                    }
                    
                    base64 = canvas.toDataURL("image/jpeg", 0.8);
                }else if (navigator.userAgent.match(/Android/i)) {
                   // 修复android
                   /*这个已经废弃了
                    var encoder = new JPEGEncoder();
                    base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
                    */
                    base64 = canvas.toDataURL("image/jpeg", 0.8)
                }else{
                    //alert(Orientation);
                    if(Orientation != "" && Orientation != 1){
                        //alert('旋转处理');
                        switch(Orientation){
                            case 6://需要顺时针（向左）90度旋转
                                alert('需要顺时针（向左）90度旋转');
                                rotateImg(this,'left',canvas);
                                break;
                            case 8://需要逆时针（向右）90度旋转
                                alert('需要顺时针（向右）90度旋转');
                                rotateImg(this,'right',canvas);
                                break;
                            case 3://需要180度旋转
                                alert('需要180度旋转');
                                rotateImg(this,'right',canvas);//转两次
                                rotateImg(this,'right',canvas);
                                break;
                        }       
                    }
                    
                    base64 = canvas.toDataURL("image/jpeg", 0.8);
                }
                //uploadImage(base64);
                $("#myImage").attr("src", base64);
            };
        };
        oReader.readAsDataURL(file);
    }
}
 
//对图片旋转处理 added by lzk
function rotateImg(img, direction,canvas) {  
    //alert(img);
    //最小与最大旋转方向，图片旋转4次后回到原方向  
    var min_step = 0;  
    var max_step = 3;  
    //var img = document.getElementById(pid);  
    if (img == null)return;  
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错  
    var height = img.height;  
    var width = img.width;  
    //var step = img.getAttribute('step');  
    var step = 2;  
    if (step == null) {  
        step = min_step;  
    }  
    if (direction == 'right') {  
        step++;  
        //旋转到原位置，即超过最大值  
        step > max_step && (step = min_step);  
    } else {  
        step--;  
        step < min_step && (step = max_step);  
    }   
    //旋转角度以弧度值为参数  
    var degree = step * 90 * Math.PI / 180;  
    var ctx = canvas.getContext('2d');  
    switch (step) {  
        case 0:  
            canvas.width = width;  
            canvas.height = height;  
            ctx.drawImage(img, 0, 0);  
            break;  
        case 1:  
            canvas.width = height;  
            canvas.height = width;  
            ctx.rotate(degree);  
            ctx.drawImage(img, 0, -height);  
            break;  
        case 2:  
            canvas.width = width;  
            canvas.height = height;  
            ctx.rotate(degree);  
            ctx.drawImage(img, -width, -height);  
            break;  
        case 3:  
            canvas.width = height;  
            canvas.height = width;  
            ctx.rotate(degree);  
            ctx.drawImage(img, -width, 0);  
            break;  
    }  
}  

```
