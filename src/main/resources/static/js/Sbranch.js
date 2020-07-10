function select(pageNum){
    console.log(pageNum);
    var sessionPage = sessionStorage.getItem("page");
    var user = JSON.parse(sessionStorage.getItem("userInfo"));
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
        url: "/party-branch/list",
        type: "get",
        data:{pageNum: pageNum},
        dataType:"JSON",
        async: false,
        success: function (data) {
            var page = data["page"];
            sessionStorage.setItem("page",page.pages);
            var records = page.records;
            var str = "";
            var gName = "";
            for (var i = 0;i<records.length;i++){
                $.ajax({
                    url: "/general-party-branch/info/"+records[i].generalpartybranchId,
                    type: "get",
                    data:{},
                    dataType:"JSON",
                    async: false,
                    success: function (data) {
                        var generalpartybranch = data["generalPartyBranch"];
                        gName = generalpartybranch.name;
                    }
                });
                    str += "<tr>" +
                        "<td>" + records[i].id + "</td>" +
                        "<td>" + records[i].name + "</td>" +
                        "<td>" + gName + "</td>" +
                        "<td>" + records[i].createTime + "</td>" +
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

            url: "/party-branch/delete/"+id,
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
        url: "/party-branch/info/"+id,
        type: "get",
        data:{},
        dataType:"JSON",
        success: function (data) {
            var info = data["partyBranch"];
            update_add(info);
        }
    });
    sessionStorage.removeItem("id");
}

function update_add(info) {
    $.ajax({
        type: "get",
        data: {},
        url: "/general-party-branch/list",
        dataType:"JSON",
        async: false,
        success: function(data) {
            var page = data["page"];
            var records = page.records;
            var gStr = "";
            for (var i = 0; i < records.length;i++){
                if(records[i].id === info.generalpartybranchId){
                    gStr+="<option id='"+records[i].name+"' value='"+records[i].id+"' selected='selected'>"+records[i].name+"</option>";
                }else{
                    gStr+="<option id='"+records[i].name+"' value='"+records[i].id+"'>"+records[i].name+"</option>";
                }
            }
            $("#update_gBranch").append(gStr);
        }
    });
    document.getElementById("update_id").value = info.id;
    document.getElementById("update_name").value = info.name;
}

function update_submit() {
    var msg = "确认修改吗?";
    var info = {
        id: document.getElementById("update_id").value,
        name: document.getElementById("update_name").value,
        generalpartybranchId: document.getElementById("update_gBranch").value,
    }
    if(info.name == ""){
        alert("数据不能为空");
        return;
    }
    if(confirm(msg) == true){
        $.ajax({
            type: "put",
            data: JSON.stringify(info),
            dataType: "json",
            contentType: "application/json",
            url: "/party-branch/update",
            success: function(response,status,xmlHttpRequest) {
                if(xmlHttpRequest.status == 204){
                    alert("修改成功");
                }else{
                    alert("修改失败");
                }
                console.log(xmlHttpRequest.status);
                location.href="branch.html";
            }
        });
    }
}

function add() {
    $.ajax({
        type: "get",
        data: {},
        url: "/general-party-branch/list",
        dataType:"JSON",
        async: false,
        success: function(data) {
            var page = data["page"];
            var records = page.records;
            var gStr = "";
            for (var i = 0; i < records.length;i++){
                gStr+="<option id='"+records[i].name+"' value='"+records[i].id+"'>"+records[i].name+"</option>";
            }
            $("#add_gBranch").append(gStr);
        }
    });
}

function add_submit() {
    var msg = "确认添加吗?";
    var info = {
        name: document.getElementById("add_name").value,
        generalpartybranchId: document.getElementById("add_gBranch").value
    }
    if(info.name == ""){
        alert("数据不能为空");
        return;
    }
    if(confirm(msg) == true){
        $.ajax({
            type: "post",
            data: JSON.stringify(info),
            dataType: "json",
            contentType: "application/json",
            url: "/party-branch/save",
            success: function(response,status,xmlHttpRequest) {
                if(xmlHttpRequest.status == 201){
                    alert("添加成功");
                }else{
                    alert("添加失败");
                }
                console.log(xmlHttpRequest.status);
                location.href="branch.html";
            }
        });
    }

}

function checkName(name){
    $.ajax({
        type: "get",
        data: {},
        url: "/party-branch/selectByName/"+name,
        success: function(response) {
            if(response.msg == "yes"){
                alert("支部名重复！");
                document.getElementById("add_name").value = "";
            }
        }
    });
}