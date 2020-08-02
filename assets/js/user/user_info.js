$(function () {
  // 1、验证昵称的规则
  var form = layui.form;
  var layer = layui.layer;

  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称是1~6位之间";
      }
     
    },
  });

  //2、发起请求，获取用户的信息，初始化用户信息
  initUserInfo();
  function initUserInfo() {
    $.ajax({
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        // 展示用户信息
         obj=res.data
        form.val("formUserInfo", res.data);
      },
    });
  }

  // 3、重置按钮的点击事件 reset和submit事件试试
  var obj=null
  $("#btnReset").click(function (e) {
    e.preventDefault(); //阻止表单的默认重置
    // initUserInfo() //采用这里重新调用展示用户信息的函数，虽然可以达到重置的要求，但是会发生多次Ajax请求
    form.val("formUserInfo", obj);
  });


//   4、提交用户的修改数据
$('.layui-form').submit(function(e){
    e.preventDefault()

    $.ajax({
        type:'post',
        url:'/my/userinfo',
        data:$(this).serialize(),
        success:function(res){
            if (res.status!==0) {
                return layer.msg('修改失败')
            } else {
                layer.msg('修改成功')

                // 刷新父页面中的用户信息,要使用父页面中的方法，得使用window.parent调用，，这里的iframe标签是作为父页面的一个子页面
                window.parent.getUserInfo()
            }
        }
    })
})
  // --------------------------
});
