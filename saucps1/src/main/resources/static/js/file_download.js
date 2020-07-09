// function download() {
//     $.ajax({
//         url: "/file/download",
//         type: "post",
//         success: function (response) {
//             console.log(response);
//             // if(response.msg == "upload success"){
//             //     alert("上传成功");
//             // }
//         }
//     });
// }

function downloadFileByForm(obj) {
    var id = obj.id;
    id = id.split("_")[1];
    var fileName = null;
    $.ajax({
        url: "/file/info/"+id,
        type: "get",
        async: false,
        success: function (response) {
            console.log(response.file.name);
            fileName = response.file.name;
        }
    });
    var url = "/file/download";
    var form = $("<form></form>").attr("action", url).attr("method", "post");
    form.append($("<input></input>").attr("type", "hidden").attr("name", "id").attr("value", id));
    form.append($("<input></input>").attr("type", "hidden").attr("name", "fileName").attr("value", fileName));
    form.appendTo('body').submit().remove();
    setTimeout(function () {
        location.reload();
    },500)
}

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
        url: "/file/list",
        type: "get",
        data:{pageNum: pageNum},
        dataType:"JSON",
        success: function (data) {
            var page = data["page"];
            sessionStorage.setItem("page",page.pages);
            var records = page.records;
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
                if(user.generalbranceId == records[i].generalbranceId || records[i].generalbranceId == "3" || user.generalbranceId == "3"){
                    str += "<tr>" +
                        "<td>" + records[i].name + "</td>" +
                        "<td>" + records[i].createTime + "</td>" +
                        "<td>" + records[i].userName + "</td>" +
                        "<td>" + gName + "</td>" +
                        "<td>" + records[i].count + "</td>" +
                        "<td><input type='button' class='btn-danger'id='delete_"+records[i].id+"'value='下载' onclick='downloadFileByForm(this)' > </td>" +
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