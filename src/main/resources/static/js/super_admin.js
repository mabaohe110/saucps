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
        url: "/user/userVMList",
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
                var branchName = null;
                var bId = null;
                var generalBranchName = null;
                if(records[i].branchId != null) {
                    $.ajax({
                        url: "/party-branch/info/" + records[i].branchId,
                        type: "get",
                        data: {},
                        dataType: "JSON",
                        async: false,
                        success: function (data) {
                            branchName = data["partyBranch"].name;
                            bId = data["partyBranch"].generalpartybranchId;
                        }
                    });
                    $.ajax({
                            url: "/general-party-branch/info/" + bId,
                            type: "get",
                            data: {},
                            dataType: "JSON",
                            async: false,
                            success: function (data) {
                                generalBranchName = data["generalPartyBranch"].name;
                            }
                    });
                }
                if(records[i].generalbranceId != null) {
                    $.ajax({
                        url: "/general-party-branch/info/" + records[i].generalbranceId,
                        type: "get",
                        data: {},
                        dataType: "JSON",
                        async: false,
                        success: function (data) {
                            generalBranchName = data["generalPartyBranch"].name;
                        }
                    });
                }
                str += "<tr>" +
                    "<td>" + records[i].id + "</td>" +
                    "<td>" + records[i].username + "</td>" +
                    "<td>" + records[i].password + "</td>" +
                    "<td>" + records[i].name + "</td>" +
                    "<td>" + records[i].sex + "</td>" +
                    "<td>" + records[i].birthday + "</td>" +
                    "<td>" + records[i].phone + "</td>" +
                    "<td>" + records[i].address + "</td>" +
                    "<td>" + records[i].partyDate + "</td>" +
                    "<td>" + generalBranchName + "</td>" +
                    "<td>" + branchName + "</td>" +
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

            url: "/user/delete/"+id,
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
        url: "/user/infoVM/"+id,
        type: "get",
        data:{},
        dataType:"JSON",
        success: function (data) {
            var user = data["user"];
            update_add(user);
        }
    });
    sessionStorage.removeItem("id");
}

function update_add(user) {
    sessionStorage.setItem("user",user);
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
                if(records[i].id === user.generalbranceId){
                    gStr+="<option id='"+records[i].name+"' value='"+records[i].id+"' selected='selected'>"+records[i].name+"</option>";
                    var id = records[i].id;
                }else{
                    gStr+="<option id='"+records[i].name+"' value='"+records[i].id+"'>"+records[i].name+"</option>";
                }
            }
            $("#update_gBranch").append(gStr);
            update_selectBranch(id);
        }
    });

    $.ajax({
        type: "get",
        data: {},
        url: "/role/list",
        dataType:"JSON",
        async: false,
        success: function(data) {
            var page = data["page"];
            var records = page.records;
            console.log(records);
            var gStr = "";
            for (var i = 0; i < records.length;i++){
                if(records[i].roleName == user.roleName){
                    gStr+="<option id='"+records[i].id+"' value='"+records[i].roleName+"' selected>"+records[i].roleName+"</option>";
                }else{
                    gStr+="<option id='"+records[i].id+"' value='"+records[i].roleName+"'>"+records[i].roleName+"</option>";
                }
            }
            $("#update_roleName").append(gStr);
        }
    });
    document.getElementById("update_id").value = user.id;
    document.getElementById("update_userName").value = user.username;
    document.getElementById("update_password").value = user.password;
    document.getElementById("update_name").value = user.name;
    document.getElementById("update_sex").value = user.sex;
    document.getElementById("update_birth").value = user.birthday;
    document.getElementById("update_tel").value = user.phone;
    document.getElementById("update_address").value = user.address;
    document.getElementById("update_party").value = user.partyDate;
    document.getElementById("update_branch").value = user.branchId;
    document.getElementById("update_gBranch").value = user.generalbranceId;
}
//update页面二级联动
function update_selectBranch(id) {
    $("#update_branch").empty();
    var user = sessionStorage.getItem("user");
    $.ajax({
        type: "get",
        data: {},
        url: "/party-branch/gBranchList/"+id,
        dataType:"JSON",
        async: false,
        success: function(data) {
            var partyBranches = data["partyBranches"];
            var str = "";
            for (var i = 0; i < partyBranches.length;i++){
                str+="<option id='"+partyBranches[i].id+"' value='"+partyBranches[i].id+"'>"+partyBranches[i].name+"</option>"
            }
            $("#update_branch").append(str);
        }
    });
}

function update_submit() {
    var msg = "确认修改吗?";
    var user = {
        id: document.getElementById("update_id").value,
        username: document.getElementById("update_userName").value,
        password: document.getElementById("update_password").value,
        name: document.getElementById("update_name").value,
        sex: document.getElementById("update_sex").value,
        birthday: document.getElementById("update_birth").value,
        phone: document.getElementById("update_tel").value,
        address: document.getElementById("update_address").value,
        partyDate: document.getElementById("update_party").value,
        branchId: document.getElementById("update_branch").value,
        generalbranceId: document.getElementById("update_gBranch").value,
        roleName: document.getElementById("update_roleName").value
    }
    if(user.username == "" || user.password == "" || user.name == ""){
        alert("数据不能为空");
        return;
    }
    if(user.branchId == "empty"){
        user.branchId = null;
    }
    if(user.generalbranceId == "empty"){
        user.generalbranceId = null;
    }
    if(confirm(msg) == true){
        $.ajax({
           type: "put",
           data: JSON.stringify(user),
           dataType: "json",
           contentType: "application/json",
           url: "/user/updateVM",
           success: function(response,status,xmlHttpRequest) {
               if(xmlHttpRequest.status == 204){
                   alert("修改成功");
               }else{
                   alert("修改失败");
               }
               console.log(xmlHttpRequest.status);
               location.href="super_admin.html";
           }
        });
    }
}
//add页面骨架
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

    $.ajax({
        type: "get",
        data: {},
        url: "/role/list",
        dataType:"JSON",
        async: false,
        success: function(data) {
            var page = data["page"];
            var records = page.records;
            console.log(records);
            var gStr = "";
            for (var i = 0; i < records.length;i++){
                if(records[i].id == 2){
                    gStr+="<option id='"+records[i].id+"' value='"+records[i].roleName+"' selected>"+records[i].roleName+"</option>";
                }else{
                    gStr+="<option id='"+records[i].id+"' value='"+records[i].roleName+"'>"+records[i].roleName+"</option>";
                }
            }
            $("#add_roleName").append(gStr);
        }
    });
}
//add页面二级联动
function add_selectBranch(id) {
    $.ajax({
        type: "get",
        data: {},
        url: "/party-branch/gBranchList/"+id,
        dataType:"JSON",
        success: function(data) {
             var partyBranches = data["partyBranches"];
             console.log(partyBranches);
             var str = "";
            for (var i = 0; i < partyBranches.length;i++){
                str+="<option id='"+partyBranches[i].id+"' value='"+partyBranches[i].id+"'>"+partyBranches[i].name+"</option>";
            }
            $("#add_branch").append(str);
        }
    });
}

function add_submit() {
    var msg = "确认添加吗?";
    var user = {
        username: document.getElementById("add_userName").value,
        password: document.getElementById("add_password").value,
        name: document.getElementById("add_name").value,
        sex: document.getElementById("add_sex").value,
        birthday: document.getElementById("add_birth").value,
        phone: document.getElementById("add_tel").value,
        address: document.getElementById("add_address").value,
        partyDate: document.getElementById("add_party").value,
        branchId: document.getElementById("add_branch").value,
        generalbranceId: document.getElementById("add_gBranch").value,
        roleName: document.getElementById("add_roleName").value,
    }
    if(user.username == "" || user.password == "" || user.name == ""){
        alert("数据不能为空");
        return;
    }
    if(user.branchId == "empty"){
        user.branchId = null;
    }
    if(user.generalbranceId == "empty"){
        user.generalbranceId = null;
    }
    if(confirm(msg) == true){
        $.ajax({
            type: "post",
            data: JSON.stringify(user),
            dataType: "json",
            contentType: "application/json",
            url: "/user/saveUserVM",
            success: function(response,status,xmlHttpRequest) {
                if(xmlHttpRequest.status == 201){
                    alert("添加成功");
                }else{
                    alert("添加失败");
                }
                console.log(xmlHttpRequest.status);
                location.href="super_admin.html";
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
