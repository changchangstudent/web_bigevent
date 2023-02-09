$(function () {
    var layer = layui.layer
    var form = layui.form
    initArtCateList()
    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res);
                var htmlStr = template("tpl-table", res)
                $("tbody").html(htmlStr)
            }
        })
    }

    // 为添加类别按钮绑定点击事件
    var indexAdd = null
    $("#btnAddCate").on("click", function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            , content: $("#dialog-add").html()
        })
    })

    // 为form表单通过代理的方式绑定提交事件
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault()

        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("新增文章分类失败!")
                }
                layer.msg("新增文章分类成功!")
                initArtCateList()
                layer.close(indexAdd)
            }
        })
    })
    // 为编辑按钮通过动态代理的方式绑定点击事件
    var indexEdit = null
    $("body").on("click", ".btn-edit", function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            , content: $("#dialog-edit").html()
        })

        var id = $(this).attr("data-id")

        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + id,
            success: function (res) {
                form.val("form-edit", res.data)
            }
        })
    })

    // 为修改分类表单通过代理绑定提交事件
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault()

        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("更新分类信息失败！")
                }
                layer.msg("更新分类信息成功！")
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    // 为删除按钮绑定点击事件
    $("body").on("click", ".btn-delete", function () {
        var id = $(this).attr("data-id")
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: "GET",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg("删除文章分类失败！")
                    }
                    layer.msg("删除文章分类成功！")
                    layer.close(index);
                    initArtCateList()

                }
            })


        });
    })
});