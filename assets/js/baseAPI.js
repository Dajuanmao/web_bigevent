
var baseURL='http://ajax.frontend.itheima.net'


// 拦截/过滤每一次的Ajax请求，配置每次请求需要的参数
$.ajaxPrefilter(function(options){
    console.log(options);
    options.url=baseURL+options.url
    console.log(options);
})