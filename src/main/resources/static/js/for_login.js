function login() {
    $.ajax({
        type: "get",
        url: "/for/login",
        data:{},
        success: function (response,status,xmlHttpRequest) {
            sessionStorage.setItem("userInfo",JSON.stringify(response));
            console.log(response);
            console.log(xmlHttpRequest.status);
        }
    });

}

function login1() {

    $.ajax({
        type: "post",
        url: "/for/login",
        data: $('#login-form').serialize(),
        dataType: "json",
        async: false,
        success: function (response) {
            console.log(response);
            if(response.code == 200){
                location.href="index.html";
            }
            if(response.code == 201){
                alert("账号或密码错误");
            }
        }
    });

}
