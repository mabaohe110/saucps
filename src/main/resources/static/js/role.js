function select(pageNum){
    console.log(pageNum);
    var sessionPage = sessionStorage.getItem("page");
    if(pageNum < 1){
        pageNum++;
    }else if(pageNum > sessionPage){
        pageNum--;
    }
    if(pageNum == null){
        pageNum = 1;
    }else{
        $("#t_body").empty();
        $("#page").empty();
    }
    $.ajax({
        url: "/role/list",
        type: "get",
        data:{pageNum: pageNum},
        dataType:"JSON",
        async: false,
        success: function (data) {
            var page = data["page"];
            sessionStorage.setItem("page",page.pages);
            var records = page.records;
            var str = "";
            for (var i = 0;i<records.length;i++){
                str += "<tr>" +
                    "<td>" + records[i].id + "</td>" +
                    "<td>" + records[i].roleName + "</td>" +
                    "<td> <input type='button' id='update_"+records[i].id+"'class='btn-primary' value='修改' onclick=jump(this)>" +
                    "<input type='button' class='btn-danger'id='delete_"+records[i].id+"'value='删除' onclick='deleteById(this)' > </td>" +
                    "</tr>";
            }
            $("#t_body").append(str);
            var strPage = "";
            strPage += "<button style='' onclick='select("+Number(pageNum-1)+")'>上一页</button>";
            for(var i = 1;i <= page.pages;i++){
                strPage += "<button onclick='select("+i+")'>"+i+"</button>";
            }
            strPage += "<button onclick='select("+Number(pageNum+1)+")'>下一页</button>";
            $("#page").append(strPage);
        }
    });
}

function deleteById(obj){
    var msg = "确定删除吗？";
    if(confirm(msg) == true){
        var id = obj.id;
        id = id.split("_")[1];
        $.ajax({

            url: "/role/delete/"+id,
            type: "DELETE",
            data: {},
            dataType: "JSON",
            success: function (response,status,xmlHttpRequest) {
                if(xmlHttpRequest.status == 204){
                    alert("删除成功");
                }else{
                    alert("删除失败");
                }
                location.reload();
            }

        });
    }
}

function jump(obj) {
    var id = obj.id;
    id = id.split("_")[1];
    sessionStorage.setItem("id",id);
    location.href="update.html";
}

function updateById() {
    var id = sessionStorage.getItem("id");
    $.ajax({
        url: "/role/info/"+id,
        type: "get",
        data:{},
        dataType:"JSON",
        success: function (data) {
            var info = data["role"];
            update_add(info);
        }
    });
    sessionStorage.removeItem("id");
}

function update_add(info) {

    document.getElementById("update_id").value = info.id;
    document.getElementById("update_roleName").value = info.roleName;
}

function update_submit() {
    var msg = "确认修改吗?";
    var info = {
        id: document.getElementById("update_id").value,
        roleName: document.getElementById("update_roleName").value
    }
    if(info.roleName == ""){
        alert("数据不能为空");
        return;
    }
    if(confirm(msg) == true){
        $.ajax({
           type: "put",
           data: JSON.stringify(info),
           dataType: "json",
           contentType: "application/json",
           url: "/role/update",
           success: function(response,status,xmlHttpRequest) {
               if(xmlHttpRequest.status == 204){
                   alert("修改成功");
               }else{
                   alert("修改失败");
               }
               console.log(xmlHttpRequest.status);
               location.href="role.html";
           }
        });
    }
}
function add_submit() {
    var msg = "确认添加吗?";
    var info = {
        roleName: document.getElementById("add_roleName").value,
    }
    if(info.roleName == ""){
        alert("数据不能为空");
        return;
    }
    if(confirm(msg) == true){
        $.ajax({
            type: "post",
            data: JSON.stringify(info),
            dataType: "json",
            contentType: "application/json",
            url: "/role/save",
            success: function(response,status,xmlHttpRequest) {
                if(xmlHttpRequest.status == 201){
                    alert("添加成功");
                }else{
                    alert("添加失败");
                }
                console.log(xmlHttpRequest.status);
                location.href="role.html";
            }
        });
    }

}

function checkUserName(userName){
    console.log(userName);
    $.ajax({
        type: "get",
        data: {},
        url: "/user/selectByUserName/"+userName,
        success: function(response) {
            if(response.msg == "yes"){
                alert("用户名重复！");
                document.getElementById("add_userName").value = "";
            }
        }
    });
}
