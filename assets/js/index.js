$(function () {
    getUserInfo()

    // 点击退出按钮实现退出功能
    var layer = layui.layer
    $(".btnLogout").on("click", function () {
        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function (index) {
            //do
            // 1. 清空token
            localStorage.removeItem("token")
            // 2. 跳转到登录页面
            location.href = "/login.html"
            layer.close(index);
        });
    })
})

// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        url: "/my/userinfo",
        method: "GET",
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败!")
            }
            // 获取用户信息成功,渲染用户头像
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message == "身份认证失败！") {
        //         // 清空token
        //         localStorage.removeItem("token")
        //         // 跳转到登陆页面
        //         location.href = "/login.html"
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    // 设置欢迎文本
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 设置用户自己的头像,隐藏文字头像
        $(".layui-nav-img").attr("src", user.user_pic).show()
        $(".text-avater").hide()
    } else {
        // 设置用户文字头像,隐藏用户自己的头像
        $(".layui-nav-img").hide()

        var first = name[0].toUpperCase()
        $(".text-avater").html(first).show()

    }

    function setId(a, b) {
        $(a).addClass("layui-this")
        $(b).removeClass("layui-this")
    }
}