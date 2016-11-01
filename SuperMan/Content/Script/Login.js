function GetLogin() {
    $.ajax({
        // wait fo modify
        url: "http://52.198.189.19:2453/api/member/" + $("#login-password").val(),
        success: function (data) {
            if (data != null) {
                alert(data.Name);
                alert(data.MemberId);
            }
            else {
                alert("error");
            }
        }
    });
}