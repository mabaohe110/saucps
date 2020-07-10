function upload(){
     var file = new FormData();
    file.append("file",$("#file")[0].files[0]);
    console.log(file);
        $.ajax({
            url: "/file/upload",
            type: "post",
            processData: false,
            contentType: false,
            data: file,
            async: false,
            success: function (response) {
                console.log(response);
                if(response.msg == "upload success"){
                    var user = JSON.parse(sessionStorage.getItem("userInfo"));
                    var myFile = {name: response.file,userName: user.name,generalbranceId: user.generalbranceId};
                    console.log(myFile);
                    $.ajax({
                        type: "post",
                        data: JSON.stringify(myFile),
                        dataType: "json",
                        contentType: "application/json",
                        url: "/file/save",
                        success: function(response,status,xmlHttpRequest) {
                            if(xmlHttpRequest.status == 201){
                                alert("上传成功");
                            }else{
                                alert("上传失败");
                            }
                            location.reload();
                        }
                    });
                }
            }
        });
}

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
        url: "/file/list",
        type: "get",
        data:{pageNum: pageNum},
        dataType:"JSON",
        async: false,
        success: function (data) {
            var page = data["page"];
            sessionStorage.setItem("page",page.pages);
            var records = page.records;
            console.log(records);
            var str = "";
            var gName = "";
            for (var i = 0;i<records.length;i++){
                $.ajax({
                    url: "/general-party-branch/info/" + records[i].generalbranceId,
                    type: "get",
                    data: {},
                    dataType: "JSON",
                    async: false,
                    success: function (data) {
                        gName = data["generalPartyBranch"].name;
                    }
                });
                str += "<tr>" +
                    "<td>" + records[i].id + "</td>" +
                    "<td>" + records[i].name + "</td>" +
                    "<td>" + records[i].createTime + "</td>" +
                    "<td>" + records[i].userName + "</td>" +
                    "<td>" + gName + "</td>" +
                    "<td>" + records[i].count + "</td>" +
                    "<td><input type='button' class='btn-danger'id='delete_"+records[i].id+"'value='删除' onclick='deleteById(this)' > </td>" +
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
            url: "/file/delete/"+id,
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