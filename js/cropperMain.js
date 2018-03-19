/**
 * Created by HH_Girl on 2018/3/10.
 */
;(function (root, factory, plugName) {
    factory.call(root, root.jQuery, plugName);
})(window, function ($, plugName) {
    //默认设置
    var __DEFAULT__ = {
            id: 'photo',
            aspectRatio: 1,
            getImgFn: function () {
            }
        },
        __TEMPLATE__ = '<div class="img-container">' +
            '<img src="" alt="" id="{id}" style="max-height: 500px;max-width: 750px;">' +
            '</div>' +
            '<input type="file" id="{outInput}" accept="image/*">' +
            '<input type="button" value="确定" class="output-img layui-btn mt-b-20">' +
            '<input type="button" value="取消" class="close layui-btn mt-b-20">',
        //方法
        __PRO__ = {
            init: function () {
                this.cropperContainer = $('.cropper-mask');
                this.cropperContainer.html(this.getTemplate(__TEMPLATE__, {id: this.id, outInput: 'out_' + this.id}));
                this.cropperPhoto = $('#' + this.id);
                this.inputFile = $('#out_' + this.id);
                this.outputBtn = $('.output-img');
                this.closeBtn = $('.cropper-mask .close');
                //默认打开选择图片
                this.inputFile.click();
                //初始化cropper
                this.initCropper();
                //监听inputFileChange
                this.inputFileChange();
                //监听获取按钮
                this.getCropperImg();
                //取消选取
                this.closeCropper();
            },
            //初始化cropper
            initCropper: function () {
                this.cropperPhoto.cropper({
                    aspectRatio: this.aspectRatio,// 纵横比
                    viewMode: 2
                });
            },
            //监听inputFile
            inputFileChange: function () {
                var that = this;
                this.inputFile.on('change', function () {
                    var files = this.files,
                        file, blobURL;
                    if (files && files.length) {
                        file = files[0];
                        if (/^image\/\w+$/.test(file.type)) {
                            if (blobURL) {
                                URL.revokeObjectURL(blobURL);
                            }
                            blobURL = URL.createObjectURL(file);
                            // 重置cropper，将图像替换
                            that.cropperPhoto.cropper('reset').cropper('replace', blobURL);
                        } else {
                            window.alert('请选择一个图像文件！');
                        }
                    }
                })
            },
            //获取剪切图片
            getCropperImg: function () {
                var that = this;
                this.outputBtn.on('click', function () {
                    if(!that.cropperPhoto.cropper('getCroppedCanvas')){
                        return false;
                    }
                    that.cropperPhoto.cropper('getCroppedCanvas').toBlob(function (blob) {
                        if(blob.size>2 * 1024 * 1000){
                            alert('图片大于2m，请重新上传');
                            return false;
                        }
                        //显示图片
                        that.attr('src', URL.createObjectURL(blob));
                        //得到图片
                        that.getImgFn(blob);
                    });
                    //销毁
                    that.cropperPhoto.cropper('destroy');
                    that.cropperContainer.hide();
                });
            },
            //取消选取
            closeCropper: function () {
                var that = this;
                this.closeBtn.on('click', function () {
                    that.cropperContainer.hide();
                });
            },
            //处理模板
            getTemplate: function (temp, data) {
                for (var prop in data) {
                    temp = temp.replace('{' + prop + '}', data[prop]);
                }
                return temp;
            }
        };
    //核心函数
    $.fn[plugName] = function (options) {
        //继承
        $.extend(this, __DEFAULT__, __PRO__, options);
        //初始化
        this.init();
    }
}, 'myCropper');