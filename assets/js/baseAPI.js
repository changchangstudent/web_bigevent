// ajaxPrefilter 这个函数可以拿到用户给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = "http://www.liulongbin.top:3007" + options.url
    console.log(options.url);
})