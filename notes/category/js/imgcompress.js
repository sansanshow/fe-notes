export function compress(file, cb, isNeedCompass = false) {
  // 压缩图片需要的一些元素和对象
  const reader = new FileReader();
  const img = new Image();
  // 选择的文件对象
  // let file = null;
  // 缩放图片需要的canvas
  const canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');
  debugger;
  // base64地址图片加载完毕后
  img.onload = function () {
    // 图片原始尺寸
    const originWidth = this.width;
    const originHeight = this.height;
    const ratio = originWidth/originHeight;
    // 最大尺寸限制
    const maxWidth = 1000, maxHeight = 1000;
    if (ratio <= 0.33333 || ratio >= 3) {
      console.log();
    }
    // 目标尺寸
    let targetWidth = originWidth;
    let targetHeight = originHeight;
    // 图片尺寸超过400x400的限制
    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > maxWidth / maxHeight) {
        // 更宽，按照宽度限定尺寸
        targetWidth = maxWidth;
        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
      } else {
        targetHeight = maxHeight;
        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
      }
    }
        
    // canvas对图片进行缩放
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    // 清除画布
    context.clearRect(0, 0, targetWidth, targetHeight);
    // 图片压缩
    context.drawImage(img, 0, 0, targetWidth, targetHeight);
    // canvas转为base64并回调
    cb(canvas.toDataURL('image/jpeg', 0.8));
    canvas.toBlob((blob) => {
      debugger;
      console.log(blob);
    });
  };

  // 文件base64化，以便获知图片原始尺寸
  reader.onload = function(e) {
      img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
