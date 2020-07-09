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
        url: "/organization-info/list",
        type: "get",
        data:{pageNum: pageNum},
        dataType:"JSON",
        async: false,
        success: function (data) {
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
                if(user.generalbranceId == records[i].generalPartyBranchId || records[i].generalPartyBranchId == "3" || user.generalbranceId == "3"){
                    str += "<tr>" +
                        // "<td>" + records[i].id + "</td>" +
                        "<td>" + records[i].time + "</td>" +
                        "<td>" + records[i].place + "</td>" +
                        "<td>" + records[i].host + "</td>" +
                        "<td>" + records[i].players + "</td>" +
                        "<td>" + records[i].defaulter + "</td>" +
                        "<td>" + records[i].dataName + "</td>" +
                        "<td>" + records[i].content + "</td>" +
                        "<td>" + lifeName + "</td>" +
                        "<td>" + generalBranchName + "</td>" +
                        "<td> <input type='button' id='download_" + records[i].id + "'class='btn-primary' value='下载' onclick=downloadFileByForm(this)>" +
                        // "<td> <input type='button' id='update_" + records[i].id + "'class='btn-primary' value='修改' onclick=jump(this)>" +
                        // "<input type='button' class='btn-danger'id='delete_" + records[i].id + "'value='删除' onclick='deleteById(this)' > </td>" +
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

function downloadFileByForm(obj) {
    var id = obj.id;
    id = id.split("_")[1];
    var fileName = null;
    $.ajax({
        url: "/organization-info/info/"+id,
        type: "get",
        async: false,
        success: function (response) {
            fileName = response.organizationInfo.dataName;
        }
    });
    if(fileName != null){
        var url = "/organization-info/download";
        var form = $("<form></form>").attr("action", url).attr("method", "post");
        form.append($("<input></input>").attr("type", "hidden").attr("name", "fileName").attr("value", fileName));
        form.appendTo('body').submit().remove();
    }else{
        alert("无文件");
    }


}


// function jump(obj) {
//     var id = obj.id;
//     id = id.split("_")[1];
//     sessionStorage.setItem("id",id);
//     location.href="update.html";
// }