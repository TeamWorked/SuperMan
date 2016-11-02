var default_data = {
    name: "",
    pwd: "",
    email: "",
    phone: "",
    line: ""
};
//100000248501818
var lg = new Vue({
    el: "#content",
    data: _.clone(default_data),
    methods: {
        apply: function () {
            $.post("http://52.198.189.19:2453/api/member/register", {
                //"MemberId": "string",
                "Name": this.name,
                "Password": this.pwd,
                //"Description": "string",
                "Email": this.email,
                "Phone": this.phone,
                "Line": this.line,
                //"Image": "string"
            }, function (data) {
                if(data.StatusCode==0)
                {
                    alert("申請成功請重新登入");
                    lg.reset();
                }
                else
                {
                    alert("fail")
                }
            })
        },
        reset: function () {
            //Object.assign(this.$data, _.clone(default_data));
            _.assign(this.$data,default_data)
        },
        showTip: function (e) {
            $("#tip").fadeIn(1000).css({
                top: e.clientY + 30 ,
                left: e.clientX-30 
            }).on("mouseleave", function () {
                var timer = setTimeout(function () {
                    $("#tip").fadeOut(500);
                }, 100)
            })
        }
    }
})

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