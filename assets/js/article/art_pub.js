$(function () {

    var layer = layui.layer
    var form = layui.form
    initCate()
    // 初始化富文本编辑器
    initEditor()
    // 定义获取文章分类的方法
    function initCate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取文章分类列表失败")
                }
                // 调用模板引擎渲染下拉分类菜单
                var htmlStr = template("tpl-cate", res)
                $("[name=cate_id]").html(htmlStr)
                // 使用render方法重新渲染下拉菜单
                form.render()
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 为选择封面按钮绑定点击事件
    $("#btnChooseImage").on("click", function () {
        $("#coverFile").click()
    })

    // 为隐藏的文件选择框绑定 change 事件,获取用户选的的文件列表
    $("#coverFile").on("change", function (e) {
        var files = e.target.files
        // 判断用户是否选择了文件
        if (files.length === 0) {
            return
        }
        var newImgURL = URL.createObjectURL(files[0])

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 处理FormData 中 state数据
    var cat_state = "已发布"
    $("#btnSave2").on("click", function () {
        cat_state = "草稿"
    })

    // 为表单绑定提交事件
    $("#form-pub").on("submit", function (e) {
        e.preventDefault()
        var fm = new FormData($(this)[0])

        fm.append("state", cat_state)

        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fm.append("cover_img", blob)
                // 发起ajax请求
                publishArticle(fm)
            })
    })

    function publishArticle(fm) {
        $.ajax({
            method: "POST",
            url: "/my/article/add",
            data: fm,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("发布文章失败!")
                }
                layer.msg("发布文章成功!")
                // $(".article-list").addClass("layui-this")
                // $(".article-pub").removeClass("layui-this")
                // window.parent.setId(".article-list", ".article-pub")
                location.href = "/article/art_list.html"
            }
        })
    }

});