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
        url: "/theme-study/list",
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
                    "<td>" + records[i].startDate + "</td>" +
                    "<td>" + records[i].deadline + "</td>" +
                    "<td> <input type='button' id='update_"+records[i].id+"'class='btn-primary' value='修改' onclick=jump(this)>" +
                    "<input type='button' id='link_"+records[i].id+"'class='btn-default' value='专题学习环节' onclick=jumpLink(this)>" +
                    "<input type='button' class='btn-danger'id='delete_"+records[i].id+"'value='删除' onclick='deleteById(this)' >" +
                    "<input type='button' class='btn-success'id='file_"+records[i].id+"'value='材料' onclick='jumpFile(this)' > </td>" +
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

            url: "/theme-study/delete/"+id,
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

function jumpLink(obj) {
    var id = obj.id;
    id = id.split("_")[1];
    sessionStorage.setItem("id",id);
    location.href="study_link.html";
}

function jumpFile(obj) {
    var id = obj.id;
    id = id.split("_")[1];
    sessionStorage.setItem("id",id);
    location.href="study_file.html";
}

function updateById() {
    var id = sessionStorage.getItem("id");
    $.ajax({
        url: "/theme-study/info/"+id,
        type: "get",
        data:{},
        dataType:"JSON",
        success: function (data) {
            var themeStudy = data["themeStudy"];
            update_add(themeStudy);
        }
    });
    sessionStorage.removeItem("id");
}

function update_add(themeStudy) {

    document.getElementById("update_id").value = themeStudy.id;
    document.getElementById("update_name").value = themeStudy.name;
    document.getElementById("update_desc").value = themeStudy.description;
}

function update_submit() {
    var msg = "确认修改吗?";
    var info = {
        id: document.getElementById("update_id").value,
        name: document.getElementById("update_name").value,
        description: document.getElementById("update_desc").value,
    }
    if(info.name == "" || info.description == ""){
        alert("数据不能为空");
        return;
    }
    if(confirm(msg) == true){
        $.ajax({
           type: "put",
           data: JSON.stringify(info),
           dataType: "json",
           contentType: "application/json",
           url: "/theme-study/update",
           success: function(response,status,xmlHttpRequest) {
               if(xmlHttpRequest.status == 204){
                   alert("修改成功");
               }else{
                   alert("修改失败");
               }
               console.log(xmlHttpRequest.status);
               location.href="theme_study.html";
           }
        });
    }
}
//add页面骨架
function add() {
    sessionStorage.removeItem("count");
}
function add_submit() {
    var count = sessionStorage.getItem("count");
    var msg = "确认添加吗?";
    var info = {
        name: document.getElementById("add_name").value,
        description: document.getElementById("add_desc").value,
        startDate: document.getElementById("add_date").value,
        deadline: document.getElementById("add_deadline").value,
    }
    console.log(info);
    if(info.name == "" || info.description == ""){
        alert("数据不能为空");
        return;
    }

    if(confirm(msg) == true){
        $.ajax({
            type: "post",
            data: JSON.stringify(info),
            dataType: "json",
            contentType: "application/json",
            url: "/theme-study/save",
            async: false,
            success: function(response,status,xmlHttpRequest) {
                if(xmlHttpRequest.status == 201){
                    console.log(response["themeStudy"]);
                    for(var i = 1;i <= count;i++){
                        var link = {
                            content: document.getElementById("content"+i).value,
                            startDate: document.getElementById("startTime"+i).value,
                            deadline: document.getElementById("deadline"+i).value,
                            sort: document.getElementById("sort"+i).value,
                            materials: document.getElementById("materials"+i).value,
                            themeId: response["themeStudy"].id,
                        }
                        $.ajax({
                            type: "post",
                            data: JSON.stringify(link),
                            dataType: "json",
                            contentType: "application/json",
                            url: "/study-link/save",
                            async: false,
                            success: function(response,status,xmlHttpRequest) {
                            }
                        });
                    }
                    alert("添加成功");
                }else{
                    alert("添加失败");
                }
                location.href="theme_study.html";
            }
        });
    }

}

function insertLink() {
    var count = sessionStorage.getItem("count");
    if(count == null){
        count = 1;
        sessionStorage.setItem("count",count);
    }else{
        count++;
        sessionStorage.setItem("count",count);
    }
    var str = "";
    str+= "<tr><td style='color: red'>专题学习环节"+count+"：</td><td></td></tr>" +
        "<tr><td>学习内容</td><td><input id='content"+count+"' type='text'></td></tr>" +
        "<tr><td>开始时间</td><td><input id='startTime"+count+"'type='date'></td></tr>" +
        "<tr><td>结束时间</td><td><input id='deadline"+count+"'type='date'></td></tr>" +
        "<tr><td>应交材料</td><td><input id='materials"+count+"'type='text'></td></tr>" +
        "<tr><td>排序</td>"+"<td><input type='text' id='sort"+count+"'disabled value='"+count+"'></td></tr>";
    $("#t_tbody").append(str);

}

function selectLink(){
    var themeId = sessionStorage.getItem("id");
    $.ajax({
        url: "/study-link/selectByThemeId/"+themeId,
        type: "get",
        data:{},
        dataType:"JSON",
        success: function (data) {
            var studyLinks = data["studyLinks"];
            console.log(studyLinks);
            var str = "";
            var divStr = "";
            if(studyLinks.length == 0){
                str+= "<h3 style=\"color: red;\">暂无专题环节数据</h3>"
                $("#t_thead").append(str);
            }else{
                divStr += "<input type=\"button\" value=\"修改\" class=\"btn-primary\" style=\"float: right\" onclick=\"updateLink()\">";
                $("#t_div").append(divStr);
                for(var i = 1;i <= studyLinks.length;i++){
                    str+=
                        "<tr><td style='color: red'>专题学习环节"+i+"：</td><td></td></tr>" +
                        "<tr><td>学习内容</td><td>"+studyLinks[i-1].content+"</td></tr>" +
                        "<tr><td>开始时间</td><td>"+studyLinks[i-1].startDate+"</td></tr>" +
                        "<tr><td>结束时间</td><td>"+studyLinks[i-1].deadline+"</td></tr>" +
                        "<tr><td>应交材料</td><td>"+studyLinks[i-1].materials+"</tr>" +
                        "<tr><td>排序</td>"+"<td>"+studyLinks[i-1].sort+"</td></tr>";
                }
                $("#t_tbody").append(str);
            }
        }
    });
}

function updateLink(){

    var themeId = sessionStorage.getItem("id");
    $("#t_tbody").empty();
    $.ajax({
        url: "/study-link/selectByThemeId/"+themeId,
        type: "get",
        data:{},
        dataType:"JSON",
        success: function (data) {
            var studyLinks = data["studyLinks"];
            var divStr = "";
            console.log(studyLinks);
            var str = "";
            if(studyLinks.length == 0){
                str+= "<h3 style=\"color: red;\">暂无专题环节数据</h3>"
                $("#t_thead").append(str);
            }else{
                sessionStorage.setItem("studyLinks",JSON.stringify(studyLinks));
                for(var i = 1;i <= studyLinks.length;i++){
                    str+= "<tr><td style='color: red'>专题学习环节"+i+"：</td><td></td></tr>" +
                            "<tr><td>学习内容</td><td><input id='content"+i+"' type='text' value='"+studyLinks[i-1].content+"'></td></tr>" +
                            "<tr><td>开始时间</td><td><input id='startTime"+i+"' value='"+studyLinks[i-1].startDate+"'type='date'></td></tr>" +
                            "<tr><td>结束时间</td><td><input id='deadline"+i+"'  value='"+studyLinks[i-1].deadline+"'type='date'></td></tr>" +
                            "<tr><td>应交材料</td><td><input id='materials"+i+"'  value='"+studyLinks[i-1].materials+"'type='text'></td></tr>" +
                            "<tr><td>排序</td>"+"<td><input type='text' id='sort"+i+"'disabled  value='"+studyLinks[i-1].sort+"'></td></tr>";
                }
                $("#t_tbody").append(str);
                divStr += "<input type=\"button\" class=\"btn-orange\" value=\"修改\" onclick=\"updateLinkSubmit()\">"
                $("#t_div1").append(divStr);
            }
        }
    });
}

function updateLinkSubmit() {
    var msg = "确认修改吗?";
    var studyLinks = JSON.parse(sessionStorage.getItem("studyLinks"));
    console.log(studyLinks);
    if(confirm(msg)){
        var flag = 0;
        for(var i = 1;i <= studyLinks.length;i++){
            var info = {
                id: studyLinks[i-1].id,
                content: document.getElementById("content"+i).value,
                startDate: document.getElementById("startTime"+i).value,
                deadline:  document.getElementById("deadline"+i).value,
                sort:  document.getElementById("sort"+i).value,
                materials:  document.getElementById("materials"+i).value,
                themeId: studyLinks[i-1].themeId,
            }
            console.log(info);
            $.ajax({
                type: "put",
                data: JSON.stringify(info),
                dataType: "json",
                contentType: "application/json",
                url: "/study-link/update",
                async: false,
                success: function(response,status,xmlHttpRequest) {
                    if(xmlHttpRequest.status == 204){
                        flag = 0;
                    }else{
                        flag = 1;
                    }
                }
            });
        }
        if(flag == 0){
            alert("修改成功");
        }else{
            alert("修改失败");
        }
        location.href="theme_study.html";
    }

}

function selectFile(){
    var themeId = sessionStorage.getItem("id");
    $.ajax({
        url: "/study-file/selectByThemeId/"+themeId,
        type: "get",
        data:{},
        dataType:"JSON",
        success: function (data) {
            var Files = data["file"];
            var str = "";
                for(var i = 1;i <= Files.length;i++){
                    str+=
                        "<tr><td>"+Files[i-1].name+"</td>" +
                        "<td>"+Files[i-1].createTime+"</td><" +
                        "<td>"+Files[i-1].userName+"</td>" +
                        "<td>"+Files[i-1].generalPartyBranchId+"</td>" +
                        "<td>"+Files[i-1].linkId+"</td>" +
                        "<td><input type='button' class='btn-danger'id='download_"+Files[i-1].id+"'value='下载' onclick='downloadFileByForm(this)' > </td>" +
                        "</tr>";
                }
                $("#t_tbody").append(str);
            }
    });
}

function downloadFileByForm(obj) {
    var id = obj.id;
    id = id.split("_")[1];
    var fileName = null;
    $.ajax({
        url: "/study-file/info/"+id,
        type: "get",
        async: false,
        success: function (response) {
            console.log(response.file.name);
            fileName = response.file.name;
        }
    });
    var url = "/study-file/download";
    var form = $("<form></form>").attr("action", url).attr("method", "post");
    form.append($("<input></input>").attr("type", "hidden").attr("name", "fileName").attr("value", fileName));
    form.appendTo('body').submit().remove();
}