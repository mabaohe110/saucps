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
        url: "/organization-info/list",
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
            var generalBranchName = null;
            var lifeName = null;
            for (var i = 0;i<records.length;i++){
                $.ajax({
                    url: "/general-party-branch/info/" + records[i].generalPartyBranchId,
                    type: "get",
                    data: {},
                    dataType: "JSON",
                    async: false,
                    success: function (data) {
                        generalBranchName = data["generalPartyBranch"].name;
                    }
                });
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
               if(records[i].generalPartyBranchId == user.generalbranceId) {
                   str += "<tr>" +
                       "<td>" + records[i].id + "</td>" +
                       "<td>" + records[i].time + "</td>" +
                       "<td>" + records[i].place + "</td>" +
                       "<td>" + records[i].host + "</td>" +
                       "<td>" + records[i].players + "</td>" +
                       "<td>" + records[i].defaulter + "</td>" +
                       "<td>" + records[i].content + "</td>" +
                       "<td>" + records[i].dataName + "</td>" +
                       "<td>" + lifeName + "</td>" +
                       "<td>" + generalBranchName + "</td>" +
                       "<td> <input type='button' id='update_" + records[i].id + "'class='btn-primary' value='修改' onclick=jump(this)>" +
                       "<input type='button' class='btn-danger'id='delete_" + records[i].id + "'value='删除' onclick='deleteById(this)' > </td>" +
                       "</tr>";
               }
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

            url: "/organization-info/delete/"+id,
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
        url: "/organization-info/info/"+id,
        type: "get",
        data:{},
        dataType:"JSON",
        success: function (data) {
            var info = data["organizationInfo"];
            update_add(info);
        }
    });
    sessionStorage.removeItem("id");
}

function update_add(info) {
    var user = JSON.parse(sessionStorage.getItem("userInfo"));
    document.getElementById("update_gId").value = user.generalbranceId;
    $.ajax({
        url: "/general-party-branch/info/" + user.generalbranceId,
        type: "get",
        data: {},
        dataType: "JSON",
        async: false,
        success: function (data) {
            document.getElementById("update_generalPartyBranchId").value = data["generalPartyBranch"].name;
        }
    });
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
    document.getElementById("update_time").value = info.time;
    document.getElementById("update_place").value = info.place;
    document.getElementById("update_host").value = info.host;
    document.getElementById("update_players").value = info.players;
    document.getElementById("update_defaulter").value = info.defaulter;
    document.getElementById("update_content").value = info.content;
    document.getElementById("update_lifeId").value = info.lifeId;
}

function update_submit() {
    var msg = "确认修改吗?";
    var info = {
        id: document.getElementById("update_id").value,
        time: document.getElementById("update_time").value,
        place: document.getElementById("update_place").value,
        host: document.getElementById("update_host").value,
        players: document.getElementById("update_players").value,
        defaulter: document.getElementById("update_defaulter").value,
        content: document.getElementById("update_content").value,
        lifeId: document.getElementById("update_lifeId").value,
        generalPartyBranchId: document.getElementById("update_gId").value,
    }
    if(info.time == "" || info.place == "" || info.host == "" || info.players == "" || info.defaulter == ""
        || info.content == "" || info.lifeId == "" || info.generalPartyBranchId == ""){
        alert("数据不能为空");
        return;
    }
    if(confirm(msg) == true){
        $.ajax({
            type: "put",
            data: JSON.stringify(info),
            dataType: "json",
            contentType: "application/json",
            url: "/organization-info/update",
            success: function(response,status,xmlHttpRequest) {
                if(xmlHttpRequest.status == 204){
                    alert("修改成功");
                }else{
                    alert("修改失败");
                }
                console.log(xmlHttpRequest.status);
                location.href="organization_info.html";
            }
        });
    }
}
function add(){
    var user = JSON.parse(sessionStorage.getItem("userInfo"));
    document.getElementById("add_gId").value = user.generalbranceId;
    $.ajax({
        url: "/general-party-branch/info/" + user.generalbranceId,
        type: "get",
        data: {},
        dataType: "JSON",
        async: false,
        success: function (data) {
            document.getElementById("add_generalPartyBranchId").value = data["generalPartyBranch"].name;
        }
    });
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
        time: document.getElementById("add_time").value,
        place: document.getElementById("add_place").value,
        host: document.getElementById("add_host").value,
        players: document.getElementById("add_players").value,
        defaulter: document.getElementById("add_defaulter").value,
        content: document.getElementById("add_content").value,
        dataName: file,
        lifeId: document.getElementById("add_lifeId").value,
        generalPartyBranchId: document.getElementById("add_gId").value,
}
if(info.time == "" || info.place == "" || info.host == "" || info.players == "" || info.defaulter == ""
    || info.content == "" || info.lifeId == "empty" || info.generalPartyBranchId == "empty"){
    alert("数据不能为空");
    return;
}
if(confirm(msg) == true){
    $.ajax({
        type: "post",
        data: JSON.stringify(info),
        dataType: "json",
        contentType: "application/json",
        url: "/organization-info/save",
        async: false,
        success: function(response,status,xmlHttpRequest) {
            if(xmlHttpRequest.status == 201){
                alert("添加成功");
                $.ajax({
                    type: "put",
                    data: JSON.stringify(info),
                    dataType: "json",
                    contentType: "application/json",
                    url: "/life-date/updateDate",
                    async: false,
                    success: function(response) {
                        console.log(response);
                    }
                });
            }else{
                alert("添加失败");
            }
            console.log(xmlHttpRequest.status);
            location.href="organization_info.html";
        }
    });
}

}

function checkLifeName(name){
    console.log(name);
    $.ajax({
        type: "get",
        data: {},
        url: "/organization-life/selectLifeByName/"+name,
        success: function(response) {
            if(response.msg == "yes"){
                alert("制度名重复！");
                document.getElementById("add_name").value = "";
            }
        }
    });
}

function upload(){
    var file = new FormData();
    file.append("file",$("#file")[0].files[0]);
    $.ajax({
        url: "/organization-info/upload",
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
