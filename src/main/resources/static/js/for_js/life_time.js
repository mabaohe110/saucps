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
        url: "/life-date/list",
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
                       "<td>" + records[i].lastDate + "</td>" +
                       "<td>" + records[i].nextDate + "</td>" +
                       "<td>" + lifeName + "</td>" +
                       "<td>" + records[i].count + "</td>" +
                       // "<td> <input type='button' id='update_" + records[i].id + "'class='btn-primary' value='修改' onclick=jump(this)>" +
                       // "<input type='button' class='btn-danger'id='delete_" + records[i].id + "'value='删除' onclick='deleteById(this)' > </td>" +
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

function myBody(){
    $.ajax({
        url: "/life-date/list",
        type: "get",
        data:{},
        dataType:"JSON",
        async: false,
        success: function (data) {
            var page = data["page"];
            var records = page.records;
            var lifeName = null;
            var myStr = "";
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
                if(lifeName == "党课"){
                    if(records[i].count < 4){
                        document.getElementById("em_id").innerText = 4 - records[i].count;
                    }else{
                        document.getElementById("em_id").innerText = 0;
                    }
                }else{
                    var day = new Date();
                    var month = day.getMonth()+1;
                    var str = day.getFullYear()+"-"+month+"-"+day.getDate();
                    var startDate = Date.parse(str);
                    var endDate = Date.parse(records[i].nextDate);
                    var days = (endDate - startDate) / (24*60*60*1000);
                    if(Math.round(days) <= 7){
                        myStr+=
                            "<p>"+lifeName+"</p>";
                    }
                }
            }
            if(myStr == ""){
                myStr+="<p>暂无</p>";
            }
            $("#t_div").append(myStr);
        }
    });

    $.ajax({
        url: "/theme-study/list",
        type: "get",
        data:{},
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
                if((myDate <= new Date(records[i].deadline)) && (myDate >= new Date(records[i].startDate))){
                        str+="<p>"+records[i].name+"</p>";
                }
            }
            if(str == ""){
                str+="<p>暂无</p>";
            }
            $("#t_div1").append(str);
        }
    });
}

