// ajaxPrefilter 这个函数可以拿到用户给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 给所有的ajax请求拼接根路径
    options.url = "http://www.liulongbin.top:3007" + options.url


    // 统一为有权限的接口设置 headers 请求头
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }

    // 全局同意挂载complete回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message == "身份认证失败！") {
            // 清空token
            localStorage.removeItem("token")
            // 跳转到登陆页面
            location.href = "/login.html"
        }
    }
})