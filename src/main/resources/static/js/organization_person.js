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
        url: "/organization-remind/list",
        type: "get",
        data:{pageNum: pageNum},
        dataType:"JSON",
        async: false,
        success: function (data) {
            var page = data["page"];
            sessionStorage.setItem("page",page.pages);
            var records = page.records;
            var str = "";
            var lifeName = null;
            for (var i = 0;i<records.length;i++){
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
                   str += "<tr>" +
                       "<td>" + records[i].id + "</td>" +
                       "<td>" + records[i].name + "</td>" +
                       "<td>" + records[i].deadline + "</td>" +
                       "<td>" + records[i].dataName + "</td>" +
                       "<td>" + lifeName + "</td>" +
                       "<td>" + records[i].checked + "</td>" +
                       "<td> <input type='button' id='download_" + records[i].id + "'class='btn-primary' value='下载' onclick=downloadFileByForm(this)>" +
                       "<input type='button' class='btn-default' id='alert_" + records[i].id + "'value='接收提醒' onclick='alertById(this)' > </td>" +
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

function alertById(obj){
    var msg = "确定接收提醒吗？";
    if(confirm(msg) == true){
        var id = obj.id;
        id = id.split("_")[1];
        $.ajax({
            url: "/organization-remind/info/"+id,
            type: "get",
            data:{},
            dataType:"JSON",
            success: function (data) {
                var info = data["organizationRemind"];
                if(info.checked == "开启"){
                    info.checked = "关闭";
                    $.ajax({
                        type: "put",
                        data: JSON.stringify(info),
                        dataType: "json",
                        contentType: "application/json",
                        url: "/organization-remind/update",
                        async: false,
                        success: function(response,status,xmlHttpRequest) {
                            location.href="organization_remind.html";
                        }
                    });
                }else{
                    location.href="organization_remind.html";
                }
            }
        });
    }
}

function downloadFileByForm(obj) {
    var id = obj.id;
    id = id.split("_")[1];
    var fileName = null;
    $.ajax({
        url: "/organization-remind/info/"+id,
        type: "get",
        async: false,
        success: function (response) {
            console.log(response.organizationRemind.dataName);
            fileName = response.organizationRemind.dataName;
        }
    });
    var url = "/organization-remind/download";
    var form = $("<form></form>").attr("action", url).attr("method", "post");
    form.append($("<input></input>").attr("type", "hidden").attr("name", "fileName").attr("value", fileName));
    form.appendTo('body').submit().remove();

}
