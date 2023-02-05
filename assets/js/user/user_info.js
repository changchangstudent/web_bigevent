$(function () {
    // 表单验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度必须在1 ~ 6 个字符之间!"
            }
        }
    });

    initUserInfo()
    // 初始化用户信息
    function initUserInfo() {
        // 发起ajax请求
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户基本信息失败！")
                }
                // console.log(res);
                // 调用form.val() 快速为表单赋值
                form.val("formUserInof", res.data)
            }
        })
    };

    // 重置表单数据
    $("#btnReset").on("click", function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        initUserInfo()
    });

    // 更新用户信息
    $(".layui-form").on("submit", function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("更新用户信息失败！")
                }
                layer.msg("更新用户信息成功！")
                // 调用父页的方法重新渲染用户的头像以及欢迎语
                window.parent.getUserInfo()
            }
        })
    });
})