$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  //
  $("#btnChooseImage").click(function () {
    $("#file").click();
  });

  $("#file").on("change", function (e) {
    var file = e.target.files[0]; //是一个伪数组
    // var fileList=$('#file')[0].files
    var imageUrl = URL.createObjectURL(file);

    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", imageUrl) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  // 点击确定，使图片上传到父页面
  $("#btnUpload").click(function () {
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

      $.ajax({
        type:'post',
        url:'/my/update/avatar',
        data:{
           avatar:dataURL
        },
        success:function(res){
          if (res.status!==0) {
            return layer.mgs(res.message)
          }

          layer.msg('头像上传成功')

          // 刷新父页面中的个人资料
          window.parent.getUserInfo()
        }
      })
  });
  // ------------------------
});
