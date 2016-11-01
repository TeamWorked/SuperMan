function GetLogin() {
    $.ajax({
        // wait fo modify
        url: "http://52.198.189.19:2453/api/member/login?email=" + $("#login-email").val() + "&password=" + $("#login-password").val(),
        success: function (data) {
            if (data != null) {
                //alert(data.Name);
                //alert(data.MemberId);
                setCookie("memberInfo", JSON.stringify(data));
                location.href = "/";
            }
            else {
                alert("查無此用戶，請重新輸入或註冊");
            }
        }
    });
}