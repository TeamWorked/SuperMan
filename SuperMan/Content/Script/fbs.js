var fbUser = new Object();

$(document).ready(function () {

    window.fbAsyncInit = function () {
        FB.init({
            appId: '176183376121181',
            xfbml: true,
            version: 'v2.8'
        });

        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                FB.api('/me', function (response) {
                    fbUser.name = response.name;
                    fbUser.memberId = response.id;

                    //fb id ¼È®É·í±K½X¥Î
                    $("#login-password").val(fbUser.memberId);
                    //$("#header-user").text("Hi, " + fbUser.name);
                });
            } else if (response.status === 'not_authorized') {
                //document.getElementById('status').innerHTML = 'We are not connected.';
            }
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

});