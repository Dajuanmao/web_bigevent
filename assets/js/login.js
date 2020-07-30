$(function(){
    // 1、点击去注册的a链接的点击事件
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 2、去登陆的点击事件
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 3、用户名和密码的验证 layui的表单自定义验证
    var form=layui.form;
    // 3、1利用form对象创建验证规则
    form.verify({
        // [/^[\s]{6,12}/]
        pwd:[/^\S{6,12}$/,'密码为6-12位，并且不能有空格'],


        // 验证注册时的2次密码输入是否一致
        repwd:function(value){
            // 这个函数中的形参拿到的是确认密码框的值
            var rep=$('.reg-box [name="password"]').val()
            if(rep!==value) return "两次密码输入不一致"
        }
    })

    // 4、注册--表单的提交事件
    var layer=layui.layer
    $('#form_reg').submit(function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/api/reguser',
            // data:$('#form_reg').serialize(),
            data:{
               username:$('#form_reg [name=username]').val(),
               password:$('#form_reg [name=password]').val()
            },
            success:function(res){
                if (res.status!==0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#link_login').click()
                $('#form_reg')[0].reset()
            }
        })
    })

    //  5、登陆的点击事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/api/login',
            data: $(this).serialize(),
            success:function(res){
                // console.log(res);
                if (res.status!==0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')

            // 第一次登陆成功，后台会返回一个token，将token保存到本地，以后再次访问有权限的页面时，需要在请求头中携带token，才可以访问，否则没有权限访问
                localStorage.setItem('token',res.token)
                // location.href='/index.html' //登陆之后跳转到后台首页
            }
        })
    })
    // -------------------------------
})