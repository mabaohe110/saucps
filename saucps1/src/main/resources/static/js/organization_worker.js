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
        url: "/organization-remind/list",
        type: "get",
        data:{pageNum: pageNum},
        dataType:"JSON",
        async: false,
        success: function (data) {
            var user = JSON.parse(sessionStorage.getItem("userInfo"));
            var page = data["page"];
            sessionStorage.setItem("page",page.pages);
            var records = page.records;
            var str = "";
            var lifeName = null;
            for (var i = 0;i<records.length;i++){
                $.ajax({
                    url: "/organization-life/info/" + records[i].lifeId,
                    type: "get",
                    data: {},
                    dataType: "JSON",
                    async: false,
                    success: function (data) {
                        lifeName = data["organizationLife"].name;
                    }
                });
                   str += "<tr>" +
                       "<td>" + records[i].id + "</td>" +
                       "<td>" + records[i].name + "</td>" +
                       "<td>" + records[i].deadline + "</td>" +
                       "<td>" + records[i].dataName + "</td>" +
                       "<td>" + lifeName + "</td>" +
                       "<td>" + records[i].checked + "</td>" +
                       "<td> <input type='button' id='update_" + records[i].id + "'class='btn-primary' value='修改' onclick=jump(this)>" +
                       "<input type='button' class='btn-danger'id='delete_" + records[i].id + "'value='删除' onclick='deleteById(this)' >" +
                       "<input type='button' class='btn-default' id='alert_" + records[i].id + "'value='提醒' onclick='alertById(this)' > </td>" +
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

function alertById(obj){
    var msg = "确定提醒吗？";
    if(confirm(msg) == true){
        var id = obj.id;
        id = id.split("_")[1];
        $.ajax({
            url: "/organization-remind/info/"+id,
            type: "get",
            data:{},
            dataType:"JSON",
            success: function (data) {
                var info = data["organizationRemind"];
                if(info.checked == "关闭"){
                    info.checked = "开启";
                    $.ajax({
                        type: "put",
                        data: JSON.stringify(info),
                        dataType: "json",
                        contentType: "application/json",
                        url: "/organization-remind/update",
                        async: false,
                        success: function(response,status,xmlHttpRequest) {
                            location.href="organization_remind.html";
                        }
                    });
                }else{
                    location.href="organization_remind.html";
                }
            }
        });
    }
}

function deleteById(obj){
    var msg = "确定删除吗？";
    if(confirm(msg) == true){
        var id = obj.id;
        id = id.split("_")[1];
        $.ajax({

            url: "/organization-remind/delete/"+id,
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
        url: "/organization-remind/info/"+id,
        type: "get",
        data:{},
        dataType:"JSON",
        success: function (data) {
            var info = data["organizationRemind"];
            update_add(info);
        }
    });
    sessionStorage.removeItem("id");
}

function update_add(info) {
    $.ajax({
        type: "get",
        data: {},
        url: "/organization-life/list",
        dataType:"JSON",
        async: false,
        success: function(data) {
            var page = data["page"];
            var records = page.records;
            var gStr = "";
            for (var i = 0; i < records.length;i++){
                gStr+="<option id='"+records[i].name+"' value='"+records[i].id+"'>"+records[i].name+"</option>";
            }
            $("#update_lifeId").append(gStr);
        }
    });
    document.getElementById("update_id").value = info.id;
    document.getElementById("update_name").value = info.name;
    document.getElementById("update_data").value = info.dataName;
    document.getElementById("update_deadline").value = info.deadline;
    document.getElementById("update_lifeId").value = info.lifeId;
    document.getElementById("update_check").value = info.check;
}

function update_submit() {
    var msg = "确认修改吗?";
    var info = {
        id: document.getElementById("update_id").value,
        name: document.getElementById("update_name").value,
        deadline: document.getElementById("update_deadline").value,
        dataName: document.getElementById("update_data").value,
        lifeId: document.getElementById("update_lifeId").value,
        check: document.getElementById("update_check").value
    }
    if(info.name == "" || info.deadline == "" || info.lifeId == "empty"){
        alert("数据不能为空");
        return;
    }
    var file = new FormData();
    file.append("file",$("#file")[0].files[0]);
    console.log($("#file")[0].files[0]);
    if(confirm(msg) == true){
        if($("#file")[0].files[0] == null){
            $.ajax({
                type: "put",
                data: JSON.stringify(info),
                dataType: "json",
                contentType: "application/json",
                url: "/organization-remind/update",
                async: false,
                success: function(response,status,xmlHttpRequest) {
                    if(xmlHttpRequest.status == 204){
                        alert("修改成功");
                    }else{
                        alert("修改失败");
                    }
                    console.log(xmlHttpRequest.status);
                    location.href="organization_remind.html";
                }
            });
        }else{
            upload();
            info.dataName = $("#file")[0].files[0].name;
            $.ajax({
                type: "put",
                data: JSON.stringify(info),
                dataType: "json",
                contentType: "application/json",
                url: "/organization-remind/update",
                async: false,
                success: function(response,status,xmlHttpRequest) {
                    if(xmlHttpRequest.status == 204){
                        alert("修改成功");
                    }else{
                        alert("修改失败");
                    }
                    console.log(xmlHttpRequest.status);
                    location.href="organization_remind.html";
                }
            });
        }
    }
}
function add(){
    $.ajax({
        type: "get",
        data: {},
        url: "/organization-life/list",
        dataType:"JSON",
        async: false,
        success: function(data) {
            var page = data["page"];
            var records = page.records;
            var gStr = "";
            for (var i = 0; i < records.length;i++){
                gStr+="<option id='"+records[i].name+"' value='"+records[i].id+"'>"+records[i].name+"</option>";
            }
            $("#add_lifeId").append(gStr);
        }
    });
}

//add页面骨架
function add_submit(file) {
    var msg = "确认添加吗?";
    var info = {
        name: document.getElementById("add_name").value,
        deadline: document.getElementById("add_deadline").value,
        dataName: file,
        lifeId: document.getElementById("add_lifeId").value,
}
if(info.name == "" || info.deadline == "" || info.lifeId == "empty"){
    alert("数据不能为空");
    return;
}
if(info.dataName == ""){
    info.dataName = null;
}
if(confirm(msg) == true){
    $.ajax({
        type: "post",
        data: JSON.stringify(info),
        dataType: "json",
        contentType: "application/json",
        url: "/organization-remind/save",
        async: false,
        success: function(response,status,xmlHttpRequest) {
            if(xmlHttpRequest.status == 201){
                alert("添加成功");
            }else{
                alert("添加失败");
            }
            console.log(xmlHttpRequest.status);
            location.href="organization_remind.html";
        }
    });
}

}

function upload(){
    var file = new FormData();
    file.append("file",$("#file")[0].files[0]);
    $.ajax({
        url: "/organization-remind/upload",
        type: "post",
        processData: false,
        contentType: false,
        data: file,
        async: false,
        success: function (response) {
            console.log(response);
            if(response.msg == "upload success"){
                add_submit(response.file);
            }else{
                alert("文件上传失败");
            }
        }
    });
}
