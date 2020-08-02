$(function(){
var form=layui.form

// 1、验证三个密码输入框的密码格式
form.verify({
  pwd:[/^\S{6,12}$/,'密码长度是6~12位,不能有空格'],
  samePwd:function(value){
    if (value==$('[name=oldPwd]').val()) {
      return '新密码和旧密码一致，请重新输入'
    }
  },


  rePwd:function(value){
    if (value!==$('[name=newPwd]').val()) {
      return '确认密码与新密码不一致，请重新输入'
    }
  }
})



// 2、修改密码的提交事件
$('.layui-form').submit(function(e){
  e.preventDefault()
  $.ajax({
    type:'post',
    url:'/my/updatepwd',
    data:$(this).serialize(),
    success:function(res){
       if (res.status!==0) {
         return layer.msg(res.message)
       } else {
         layer.msg('恭喜修改密码成功')
         $('.layui-form')[0].reset()
       }
    }
  })
})
  // ------------------------
})