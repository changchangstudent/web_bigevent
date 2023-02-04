$(function () {
    // 点击去注册账号的a链接
    $("#link_reg").on('click', function () {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    // 点击登录的a链接
    $("#link_login").on('click', function () {
        $(".reg-box").hide();
        $(".login-box").show();
    });

    // 从Layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义一个pwd的密码校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位,且不能出现空格'
        ],
        // 自定义一个确认密码解耦眼规则
        repwd: function (value) {
            // 拿到用户确认密码的值(形参value)
            // 拿到用户输入密码的值
            var pwd = $(".reg-box [name=password]").val();
            // 进行比较,失败则表示两次密码不一致
            if (pwd !== value) {
                return '两次密码不一致!'
            }
        }
    });

    // 监听注册表单的提交事件
    $("#form_reg").on("submit", function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        }
        $.post("/api/reguser", data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg("注册成功,请登录!")
            $("#link_login").click()
        })
    })

    // 监听登录表单的提交事件
    $("#form_login").on("submit", function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            url: "/api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("登陆失败!")
                }
                layer.msg("登陆成功!")
                // 将登录的token保存到localStorage中
                localStorage.setItem("token", res.token)
                // console.log(res.token);
                // 登录成功后跳转到首页
                location.href = "/index.html"
            }
        })
    })


});