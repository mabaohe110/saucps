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
                    "<td class=\"text-center\">" + records[i].name + "</td>" +
                    // "<td><a href=''>支部委员会</a></td>" +
                    "<td class=\"text-center\"> <input type='button' id='details_"+records[i].id+"'class='btn-primary' value='详细信息' onclick=jump(this)>" +
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

function jump(obj){
    $("#t_thead").empty();
    $("#t_body").empty();
    $("#page").empty();
    var id = obj.id;
    id = id.split("_")[1];
    $.ajax({
        url: "/organization-life/info/"+id,
        type: "get",
        data:{},
        dataType:"JSON",
        success: function (data) {
            var life = data["organizationLife"];
            document.getElementById("list").innerText = "制度详细信息-"+life.name;
            var str = "";
            str+=life.description;
            $("#t_div").append(str);
        }
    });
}