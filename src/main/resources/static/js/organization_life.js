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
        url: "/organization-life/list",
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
                    "<td>" + records[i].name + "</td>" +
                    "<td>" + records[i].description + "</td>" +
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

            url: "/organization-life/delete/"+id,
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
        url: "/organization-life/info/"+id,
        type: "get",
        data:{},
        dataType:"JSON",
        success: function (data) {
            var life = data["organizationLife"];
            update_add(life);
        }
    });
    sessionStorage.removeItem("id");
}

function update_add(life) {
    document.getElementById("update_id").value = life.id;
    document.getElementById("update_name").value = life.name;
    document.getElementById("update_desc").value = life.description;
}

function update_submit() {
    var msg = "确认修改吗?";
    var life = {
        id: document.getElementById("update_id").value,
        name: document.getElementById("update_name").value,
        description: document.getElementById("update_desc").value,
    }
    if(life.name == "" || life.description == ""){
        alert("数据不能为空");
        return;
    }
    if(confirm(msg) == true){
        $.ajax({
            type: "put",
            data: JSON.stringify(life),
            dataType: "json",
            contentType: "application/json",
            url: "/organization-life/update",
            success: function(response,status,xmlHttpRequest) {
                if(xmlHttpRequest.status == 204){
                    alert("修改成功");
                }else{
                    alert("修改失败");
                }
                console.log(xmlHttpRequest.status);
                location.href="organization_life.html";
            }
        });
    }
}

//add页面骨架
function add_submit() {
    var msg = "确认添加吗?";
    var life = {
        name: document.getElementById("add_name").value,
        description: document.getElementById("add_desc").value,
    }
    if(life.name == "" || life.description == ""){
        alert("数据不能为空");
        return;
    }
    if(confirm(msg) == true){
        $.ajax({
            type: "post",
            data: JSON.stringify(life),
            dataType: "json",
            contentType: "application/json",
            url: "/organization-life/save",
            success: function(response,status,xmlHttpRequest) {
                if(xmlHttpRequest.status == 201){
                    alert("添加成功");
                }else{
                    alert("添加失败");
                }
                console.log(xmlHttpRequest.status);
                location.href="organization_life.html";
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
