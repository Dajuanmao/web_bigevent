
var baseURL='http://ajax.frontend.itheima.net'


// 拦截/过滤每一次的Ajax请求，配置每次请求需要的参数
$.ajaxPrefilter(
    function(options){
    console.log(options);
    options.url=baseURL+options.url
    console.log(options);



    // 判断是请求的路径是否包含/my，即判断请求的路径是否是需要权限的
    if (options.url.indexOf('/my/')!==-1) {
       options.headers={
        Authorization:localStorage.getItem('token')||''
       } 
    }


    // 为所有请求完成后进行身份验证
    options.complete=function(res){
        var data=res.responseJSON;
        console.log(data);
       if (data.status==1&&data.message=='身份认证失败！') {
           localStorage.removeItem('token')
           location.href='/login.html'
       }
    }
})