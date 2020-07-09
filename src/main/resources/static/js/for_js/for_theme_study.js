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
                var myDate = new Date();
                myDate.setHours(8,0,0);
                if((myDate <= new Date(records[i].deadline))){
                    str += "<tr>" +
                        "<td>" + records[i].name + "</td>" +
                        "<td>" + records[i].description + "</td>" +
                        "<td>" + records[i].startDate + "</td>" +
                        "<td>" + records[i].deadline + "</td>" +
                        "<td><input type='button' id='link_"+records[i].id+"'class='btn-success' value='专题学习环节' onclick=jumpLink(this)></td>" +
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

function jumpLink(obj) {
    var id = obj.id;
    id = id.split("_")[1];
    sessionStorage.setItem("id",id);
    location.href="study_link.html";
}

function selectLink(){
    var themeId = sessionStorage.getItem("id");
    $.ajax({
        url: "/study-link/selectByThemeId/"+themeId,
        type: "get",
        data:{},
        dataType:"JSON",
        async:false,
        success: function (data) {
            var studyLinks = data["studyLinks"];
            console.log(studyLinks);
            var str = "";
            var divStr = "";
            if(studyLinks.length == 0){
                str+= "<h3 style=\"color: red;\">暂无专题环节数据</h3>"
                $("#t_thead").append(str);
            }else{
                for(var i = 1;i <= studyLinks.length;i++){
                    str+=
                        "<tr><td style='color: red'>专题学习环节"+i+"：</td><td></td></tr>" +
                        "<tr><td>学习内容</td><td>"+studyLinks[i-1].content+"</td></tr>" +
                        "<tr><td>开始时间</td><td>"+studyLinks[i-1].startDate+"</td></tr>" +
                        "<tr><td>结束时间</td><td>"+studyLinks[i-1].deadline+"</td></tr>" +
                        "<tr><td>应交材料</td><td>"+studyLinks[i-1].materials+"</tr>";
                    divStr+=
                        "<option value="+studyLinks[i-1].id+">专题环节"+i+"</option>"
                }
                $("#t_tbody").append(str);
                $("#add_linkId").append(divStr);
            }
        }
    });
}

function upload(){
    var user = JSON.parse(sessionStorage.getItem("userInfo"));
    var file = new FormData();
    file.append("file",$("#file")[0].files[0]);
    $.ajax({
        url: "/study-file/upload",
        type: "post",
        processData: false,
        contentType: false,
        data: file,
        async: false,
        success: function (response) {
            console.log(response);
            if(response.msg == "upload success"){
                var info = {
                    name: response.file,
                    userName: user.name,
                    generalPartyBranchId: user.generalbranceId,
                    themeId: sessionStorage.getItem("id"),
                    linkId: document.getElementById("add_linkId").value
                }
                $.ajax({
                    type: "post",
                    data: JSON.stringify(info),
                    dataType: "json",
                    contentType: "application/json",
                    url: "/study-file/save",
                    async: false,
                    success: function(response,status,xmlHttpRequest) {
                        if(xmlHttpRequest.status == 201){
                            alert("上传成功");
                        }else{
                            alert("上传失败");
                        }
                        console.log(xmlHttpRequest.status);
                        location.href="study_link.html";
                    }
                });
            }
        }
    });
}