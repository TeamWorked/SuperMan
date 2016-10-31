function initMap() {
    var center = new google.maps.LatLng(24.1981, 120.6267);
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
}

function InitAcceptHelp(id) {
    // get detail info
    $.ajax({
        // wait fo modify
        url: Global.Api.MissionDetail + 10000000,
        success: function (data) {
            var mission = data.MissionCollection[0];
            $("#mission-title p").html(mission.Title);
            $("#mission-detail p").html(mission.Description);
            $("#mission-reward span").html(mission.Star);

            if (mission.Status == "W") {
                GetSuperManList();
            }

            if (mission.Status == "R") {
                var i = 1;
                $('.progress .circle').removeClass().addClass('circle');
                $('.progress .bar').removeClass().addClass('bar');
                setInterval(function () {
                    $('.progress .circle:nth-of-type(' + i + ')').addClass('active');

                    $('.progress .circle:nth-of-type(' + (i - 1) + ')').removeClass('active').addClass('done');

                    $('.progress .circle:nth-of-type(' + (i - 1) + ') .label').html('&#10003;');

                    $('.progress .bar:nth-of-type(' + (i - 1) + ')').addClass('active');

                    $('.progress .bar:nth-of-type(' + (i - 2) + ')').removeClass('active').addClass('done');

                    i++;

                    if (i == 0) {
                        $('.progress .bar').removeClass().addClass('bar');
                        $('.progress div.circle').removeClass().addClass('circle');
                        i = 1;
                    }
                }, 1000);
            }
        }
    });
}

function GetSuperManList() {
    $.ajax({
        // wait fo modify
        url: Global.Api.SuperManList + 10000007,
        success: function (data) {
            if (data.MsgReqeustList.length > 0) {
                $.each(data.MsgReqeustList, function (i, v) {
                    var memberInfo = v.MemberInfo;
                    if (memberInfo != null) {
                        var memberMedalInfo = memberInfo.MemberMedalInfo[0];

                        var $content = $("<div class=\"well row\"></div>");

                        var $name = $("<div class=\"col-lg-3\"></div>");
                        var $name_img = $(String.format("<img class=\"img-circle-normal\" src=\"{0}\">", UrlBuilder.ImageUrl("user-shape.svg")));
                        var $name_name = $(String.format("<p>{0}</p>", memberInfo.Name));

                        var $evaluation = $("<div id=\"evaluation\"></div>");
                        var $good = $(String.format("<span><img src=\"{0}\" class=\"img-square-mini\"/>{1}</span>", UrlBuilder.ImageUrl("Like-icon.png"), memberInfo.Good));
                        var $bad = $(String.format("<span><img src=\"{0}\" class=\"img-square-mini\"/>{1}</span>", UrlBuilder.ImageUrl("Unlike-icon.png"), memberInfo.Bad));
                        $evaluation.append($good);
                        $evaluation.append($bad);

                        $name.append($name_img);
                        $name.append($name_name);
                        //$name.append($evaluation);

                        var $level = $("<div class=\"col-lg-2\"></div>");
                        var $level_img = $(String.format("<img class=\"img-square-normal\" src=\"{0}\"\ title=\"{1}\">", UrlBuilder.ImageUrl(memberMedalInfo.Image), memberMedalInfo.MedalName));
                        $level.append($level_img);

                        var $contact = $("<div class=\"col-lg-5\"></div>");
                        if (memberInfo.Email) {
                            $contact_email = $(String.format("<p>Email : {0}</p>", memberInfo.Email));
                            $contact.append($contact_email);
                        }
                        if (memberInfo.Phone) {
                            $contact_phone = $(String.format("<p>Phone : {0}</p>", memberInfo.Phone));
                            $contact.append($contact_phone);
                        }
                        if (memberInfo.Line) {
                            $contact_line = $(String.format("<p>Line : {0}</p>", memberInfo.Line));
                            $contact.append($contact_line);
                        }

                        var $confirm = $("<div class=\"col-lg-2\"></div>");
                        $confirm.append("<button class=\"btn btn-super\" type=\"button\" onclick=\"AcceptMission(" + memberInfo.MemberId + ")\">Accept</button>");

                        $content.append($name);
                        $content.append($level);
                        $content.append($contact);
                        $content.append($confirm);

                        $("#superman-list").append($content);
                    }
                });
            }
        }
    });
}

function AcceptMission(id) {

}