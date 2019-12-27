## 1. type="file"
**获取选中文件的信息:**  
选中文件通过 `HTMLInputElement.files` 属性返回 — 返回值是一个 `FileList` 对象,这个对象是一个包含了许多 `File` 文件的列表(你也可以像列表一样操作它).

每个 `File` 对象包含了下列信息: 

- name: 文件名.
- lastModified: UNIX timestamp 形式的最后修改时间.
- lastModifiedDate:  Date 形式的最后修改时间.
- size: 文件的字节大小.
- type: DOMString 文件的 MIME 类型.

## 2. capture -- 设置选择需要调用的功能
- `camera` -- 照相机
- `camcorder` -- 摄像机
- `microphone` -- 录音 

没有该属性一般会有选择框出现 选择` 拍照(视频)/相册`

## 3. accept -- 直接打开系统文件目录
表示可以选择的文件MIME类型，多个MIME类型用英文逗号分开，常用的MIME类型见下`表-1`。
- image/*   
假如需要限定图片类型
可以这样写`accept="image/png,image/jpg"`   
eg:
```
<input type="file" accept="image/png,image/jpg" capture="camera">
```

- video/* 视频文件

- audio/* 音频文件

### 表-1
| 后缀名  | MIME名称 |
| :-      | :-    |
| *.3gpp  |   audio/3gpp, video/3gpp |
| *.ac3   |   audio/ac3 |
| *.asf   |   allpication/vnd.ms-asf |
| *.au    |   audio/basic |
| *.css   |   text/css |
| *.csv   |   text/csv
| *.doc   |   application/msword     |
| *.dot   |   application/msword     |
| *.dtd   |   application/xml-dtd   |  
| *.dwg   |   image/vnd.dwg     |
| *.dxf   |   image/vnd.dxf |
| *.gif   |   image/gif    | 
| *.htm   |   text/html     |
| *.html  |   text/html     |
| *.jp2   |   image/jp2  |   
| *.jpe   |   image/jpeg |
| *.jpeg  |   image/jpeg |
| *.jpg   |   image/jpeg     |
| *.js    |   text/javascript, application/javascript     |
| *.json  |   application/json     |
| *.mp2   |   audio/mpeg, video/mpeg  |  
| *.mp3   |   audio/mpeg     |
| *.mp4   |   audio/mp4, video/mp4    | 
| *.mpeg  |   video/mpeg    | 
| *.mpg   |   video/mpeg     |
| *.mpp   |   application/vnd.ms-project   |
| *.ogg   |   application/ogg, audio/ogg  |
| *.pdf   |   application/pdf  |   
| *.png   |   image/png    | 
| *.pot   |   application/vnd.ms-powerpoint    | 
| *.pps   |   application/vnd.ms-powerpoint  |  
| *.ppt   |   application/vnd.ms-powerpoint   |  
| *.rtf   |   application/rtf, text/rtf      |  
| *.svf   |   image/vnd.svf  |  
| *.tif   |   image/tiff  |
| *.tiff  |   image/tiff   |
| *.txt   |   text/plain   |
| *.wdb   |   application/vnd.ms-works    | 
| *.wps   |   application/vnd.ms-works    |  
| *.xhtml |   application/xhtml+xml    | 
| *.xlc   |   application/vnd.ms-excel   |   
| *.xlm   |   application/vnd.ms-excel   |    
| *.xls   |   application/vnd.ms-excel  |   
| *.xlt   |   application/vnd.ms-excel  | 
| *.xlw   |   application/vnd.ms-excel  |  
| *.xml   |   text/xml, application/xml    |  
| *.zip   |   aplication/zip      | 
| *.xlsx  |   application/vnd.openxmlformats-officedocument.spreadsheetml.sheet |
## 4. multiple
`HTML5`

这个属性指示用户能否输入多个值。这个属性仅在type属性为email或file的时候生效 ; 否则被忽视.

```
// capture -- 设置选择需要调用的功能
// camera -- 照相机
// camcorder -- 摄像机
// microphone -- 录音 
// accept -- 直接打开系统文件目录

<input type="file" accept="image/*" capture="camera">
<input type="file" accept="video/*" capture="camcorder">
<input type="file" accept="audio/*" capture="microphone">

//input:file标签还有一个属性multiple 用来支持多选 直接呼出原生选项
<input type="file" accept="image/*" multiple>
```