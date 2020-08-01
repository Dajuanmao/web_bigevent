// 入口函数
$(function(){
    // 在入口函数中调用用户基本信息函数
    getUserInfo()
    

    // 退出功能****************************************
    var layer=layui.layer
    $('#btnLogout').click(function(){
        layer.confirm('确认退出吗?', {icon: 3, title:'提示'}, function(index){
            layer.close(index); //关闭提示框
               //do something
            // 退出时删除本地的token
               localStorage.removeItem('token')
               location.href='/login.html'
          });
    })
    
    
    })
// ***************************************************

// 获取用户基本信息
function getUserInfo(){
  $.ajax({
      type:'get',
      url:'/my/userinfo',

    //   headers是请求头配置对象,是jQuery中的ajax专门用来设置请求头的属性；；原生js中设置请求头的属性是setRequestHeader
     /*  headers:{
        Authorization:localStorage.getItem('token')||''
      }, */
      success:function(res){
        //   token可能24小时后就失效了，需要重新登陆
          console.log(res);
        if (res.status!=0) {
            return layer.msg(res.message)
        }
        renderAvatar(res.data) //调用函数：渲染用户头像
      }
  })
}


// ****************************************
function renderAvatar(user){
    var name=user.nickname ||user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    if (user.user_pic!=null) {
        $('.layui-nav-img').show().attr('src',user.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').show().html(name[0].toUpperCase())
    }
}
