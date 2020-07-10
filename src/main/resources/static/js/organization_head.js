function select(pageNum){
    console.log(pageNum);
    var sessionPage = sessionStorage.getItem("page");
    var sessionUser = JSON.parse(sessionStorage.getItem("userInfo"));
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
        url: "/user/userVMOListBygBranchId",
        type: "get",
        data:{gBranchId: sessionUser.generalbranceId,pageNum: pageNum},
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
    var gId = user.generalbranceId;
    $.ajax({
        type: "get",
        data: {},
        url: "/general-party-branch/info/"+gId,
        dataType:"JSON",
        async: false,
        success: function(data) {
            document.getElementById("update_gBranch").value = data["generalPartyBranch"].name;
            document.getElementById("update_gId").value = data["generalPartyBranch"].id;
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
        branchId: null,
        generalbranceId: document.getElementById("update_gId").value,
        roleName: document.getElementById("update_roleName").value
    }
    if(user.username == "" || user.password == "" || user.name == ""){
        alert("数据不能为空");
        return;
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
                location.href="organization_head.html";
            }
        });
    }
}

//add页面骨架
function add() {
    var sessionUser = JSON.parse(sessionStorage.getItem("userInfo"));
    var gId = sessionUser.generalbranceId;
    $.ajax({
        type: "get",
        data: {},
        url: "/general-party-branch/info/"+gId,
        dataType:"JSON",
        async: false,
        success: function(data) {
            document.getElementById("add_gBranch").value = data["generalPartyBranch"].name;
            document.getElementById("add_gId").value = data["generalPartyBranch"].id;
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
        branchId: null,
        generalbranceId: document.getElementById("add_gId").value,
        roleName: document.getElementById("add_roleName").value,
    }
    if(user.username == "" || user.password == "" || user.name == ""){
        alert("数据不能为空");
        return;
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
                location.href="organization_head.html";
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
