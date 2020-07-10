function login() {
    $.ajax({
        type: "get",
        url: "/user/login",
        data:{},
        async: false,
        success: function (response,status,xmlHttpRequest) {
            sessionStorage.setItem("userInfo",JSON.stringify(response));
            console.log(response);
            console.log(xmlHttpRequest.status);
            document.getElementById("username").innerText = response.name;
        }
    });

}

function checkedRemind() {
    var user = JSON.parse(sessionStorage.getItem("userInfo"));
    if(user.authorities[0].authority == "ROLE_组织员"){
        var flag = 0;
        $.ajax({
            url: "/organization-remind/list",
            type: "get",
            data:{},
            dataType:"JSON",
            async: false,
            success: function (data) {
                var page = data["page"];
                var records = page.records;
                for (var i = 0;i<records.length;i++){
                    if(records[i].checked == "开启"){
                        flag = 1;
                        break;
                    }
                }
            }
        });
        if(flag == 1){
            setTimeout(function () {
                alert("请进入组织部监督提醒模块，查收最新消息");
            },500)
        }
    }
}

function login1() {

    $.ajax({
        type: "post",
        url: "/user/login",
        data: $('#login-form').serialize(),
        dataType: "json",
        async: false,
        success: function (response) {
            console.log(response);
            if(response.code == 200){
                if(response.roleName.authority == "ROLE_普通党员"){
                    alert("对不起，您无权限进入后台管理页面,已为您跳转到前台页面");
                    location.href="/for/login.html";
                }else{
                    location.href="index.html";
                }
            }
            if(response.code == 201){
                alert("账号或密码错误");
            }
        }
    });

}

function checkUser() {
    var user = JSON.parse(sessionStorage.getItem("userInfo"));
    var role = user.authorities[0].authority;
    if(role == "ROLE_超级管理员"){
        location.href="/user/super_admin/super_admin.html"
    }
    else if(role == "ROLE_支部书记"){
        location.href="/user/branch_head/branch_head.html"
    }
    else if(role == "ROLE_党总支书记"){
        location.href="/user/general_branch_head/general_branch_head.html"
    }
    else if(role == "ROLE_党委组织部长"){
        location.href="/user/organization_head/organization_head.html"
    }else{
        alert("您无权限访问该页面");
    }
    return false;
}

function checkFile() {
    var user = JSON.parse(sessionStorage.getItem("userInfo"));
    var role = user.authorities[0].authority;
    if(role == "ROLE_组织员" || role == "ROLE_组织部工作人员"){
        location.href="/user/organization/file_upload.html";
    }else{
        alert("您无权限访问该页面");
    }
    return false;
}

function checkLife() {
    var user = JSON.parse(sessionStorage.getItem("userInfo"));
    var role = user.authorities[0].authority;
    if(role == "ROLE_组织部工作人员"){
        location.href="/user/organization_life/organization_life.html";
    }else{
        alert("您无权限访问该页面");
    }
    return false;
}

function checkInfo() {
    var user = JSON.parse(sessionStorage.getItem("userInfo"));
    var role = user.authorities[0].authority;
    if(role == "ROLE_组织员"){
        location.href="/user/organization_info/organization_info.html";
    }else{
        alert("您无权限访问该页面");
    }
    return false;
}

function checkRemind() {
    var user = JSON.parse(sessionStorage.getItem("userInfo"));
    var role = user.authorities[0].authority;
    if(role == "ROLE_组织员"){
        location.href="/user/organization_remind/organization_person/organization_remind.html";
    }else if(role == "ROLE_组织部工作人员"){
        location.href="/user/organization_remind/organization_worker/organization_remind.html";
    }else{
        alert("您无权限访问该页面");
    }
    return false;
}

function checkStudy() {
    var user = JSON.parse(sessionStorage.getItem("userInfo"));
    var role = user.authorities[0].authority;
    if(role == "ROLE_组织部工作人员"){
        location.href="/user/theme_study/theme_study.html";
    }else{
        alert("您无权限访问该页面");
    }
    return false;
}

function checkBranch() {
    var user = JSON.parse(sessionStorage.getItem("userInfo"));
    var role = user.authorities[0].authority;
    if(role == "ROLE_党总支书记"){
        location.href="/user/branch/branch.html";
    }else if(role == "ROLE_超级管理员"){
        location.href="/user/branch/super_admin/branch.html";
    }else{
        alert("您无权限访问该页面");
    }
    return false;
}

function checkRole() {
    var user = JSON.parse(sessionStorage.getItem("userInfo"));
    var role = user.authorities[0].authority;
    if(role == "ROLE_超级管理员"){
        location.href="/user/role/role.html";
    }else{
        alert("您无权限访问该页面");
    }
    return false;
}

function checkGeneralBranch() {
    var user = JSON.parse(sessionStorage.getItem("userInfo"));
    var role = user.authorities[0].authority;
    if(role == "ROLE_超级管理员"){
        location.href="/user/general_branch/general_branch.html";
    }else{
        alert("您无权限访问该页面");
    }
    return false;
}

