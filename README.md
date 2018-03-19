# jQuery-cropper-photo-uploading
> 基于jquery和cropper的图片裁剪上传插件

> 此插件是在cropper的基础上进一步封装，实现裁剪，并上传的功能。cropper API对图片上传部分不是很详细，这里对其做了补充，

* 这里采用了toBlob和toDataURL两种方法处理图片信息。
* 由于toBlob有兼容性问题所以引入了canvas-to-blob。
* 样式可自行定义

## 使用方法

1. 引入相关依赖
~~~
<link rel="stylesheet" href="cropper/css/cropper.min.css">
<script src="js/jquery-1.7.min.js"></script>
<script src="cropper/js/cropper.min.js"></script>
<script src="cropper/js/canvas-to-blob.js"></script>
<script src="js/cropperMain.js"></script>
~~~

2. html
~~~
<form id="myForm">
    <img src="images/Chrysanthemum.jpg" onclick="openCropper(this,'imgUrl1','1')" style="width:500px;height:500px;">
</form>
<div class="cropper-mask" id="changeModal" style="position: absolute;top:0;left:0;"></div>
~~~
3.调用插件函数
~~~
var myForm = document.getElementById("myForm");
var formData = new FormData(myForm);
function openCropper(imgDom, userImgId, aspectRatio) {
        var fileName = userImgId + '.png';
        $('#changeModal').show();
        $(imgDom).myCropper({
            id: userImgId,
            aspectRatio: aspectRatio,
            getImgFn: function (cropperImgData) {
                formData.set(userImgId, cropperImgData, fileName);
            }
        });
    }
~~~
4.上传到后台
~~~
$('#btn').on('click', function () {
        $.ajax({
            url: "上传图片url",
            type: "post",
            data: formData,
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
            success: function (response, status, xhr) {
                console.log(response, status, xhr);
            }
        });
    });
~~~
