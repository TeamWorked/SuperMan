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

function InitAcceptHelp(missionId) {
    // get detail info
    $.ajax({
        // wait fo modify
        url: Global.Api.MissionDetail + missionId,
        success: function (data) {
            var mission = data.MissionCollection[0];
            $("#mission-title p").html(mission.Title);
            $("#mission-detail p").html(mission.Description);
            $("#mission-reward span").html(mission.Star);

            MissionStateInit(mission.Status);

            GetSuperManList(missionId, mission.SuperManId);

            //if (mission.Status == "W") {
            //    GetSuperManList(id);
            //}

            //if (mission.Status == "R") {

            //}
        }
    });
}

function MissionStateInit(state) {
    $('.progress .circle').removeClass().addClass('circle');
    $('.progress .bar').removeClass().addClass('bar');

    var index = 0;
    switch (state) {
        case 'W':
            index = 2;
            break;
        case 'R':
            index = 3;
            break;
        case 'F':
            index = 4;
            break;
        default:
            index = 2;
    }

    $('.progress .circle:nth-of-type(' + index + ')').addClass('active');

    for (var i = 1; i < index; i++) {
        $('.progress .circle:nth-of-type(' + i + ')').addClass('done');
        $('.progress .bar:nth-of-type(' + i + ')').addClass('done');
        $('.progress .circle:nth-of-type(' + i + ') .label').html('&#10003;');
    }

    $('.progress .bar:nth-of-type(' + (index - 1) + ')').addClass('active');
}

function GetSuperManList(missionId, superManId) {
    $.ajax({
        // wait fo modify
        url: Global.Api.SuperManList + missionId,
        success: function (data) {
            if (data.MsgReqeustList != null && data.MsgReqeustList.length > 0) {
                if (superManId == null) {
                    RenderSuperManList(data.MsgReqeustList);
                } else {
                    RenderSelectedSuperMan(data.MsgReqeustList, superManId);
                }
            } else {
                var $wait = $("<div class=\"well\">等待超人救援中...</div>");
                $("#superman-list").append($wait);
            }
        }
    });
}

function RenderSuperManList(superManList) {
    $.each(superManList, function (i, v) {
        var memberInfo = v.MemberInfo;
        if (memberInfo != null) {
            var memberMedalInfo = memberInfo.MemberMedalInfo[0];

            var $content = $("<div class=\"well row\"></div>");
            var $eva_bar = $("<div class=\"row\"><div class=\"eva-container\"><div class=\"evabar\" style=\"width:20%\"></div></div></div>");
            $content.append($eva_bar);

            ///////////////////////
            var $name = $("<div class=\"col-lg-3\"></div>");
            var $name_img = $(String.format("<img class=\"img-circle-normal\" src=\"{0}\">", UrlBuilder.ImageUrl("user-shape.svg")));
            var $name_name = $(String.format("<p>{0}</p>", memberInfo.Name));
            $name.append($name_img);
            $name.append($name_name);
            ///////////////////////

            //////////////////////
            var $level = $("<div class=\"col-lg-2\"></div>");
            var $level_img = $(String.format("<img class=\"img-square-normal\" src=\"{0}\"\ title=\"{1}\">", UrlBuilder.ImageUrl(memberMedalInfo.Image), memberMedalInfo.MedalName));
            $level.append($level_img);
            /////////////////////

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
            $confirm.append("<button class=\"btn btn-super\" type=\"button\" onclick=\"AcceptMission(" + memberInfo.MemberId + "," + v.MissionId + ")\">就是你了</button>");

            $content.append($name);
            $content.append($level);
            $content.append($contact);
            $content.append($confirm);

            $("#superman-list").append($content);
        }
    });
}

function RenderSelectedSuperMan(superManList, superManId)
{
    var memberInfo;
    var memberMedalInfo;
    $.each(superManList, function (i, v) {
        if (v.MemberId == superManId) {
            memberInfo = v.MemberInfo;
            memberMedalInfo = memberInfo.MemberMedalInfo[0];
            return false;
        }
    });

    $supeManContainer = $("<div class=\"well row\"></div>");

    var $eva_bar = $("<div class=\"row\"><div class=\"eva-container\"><div class=\"evabar\" style=\"width:20%\"></div></div></div>");
    $supeManContainer.append($eva_bar);

    var $name = $("<div class=\"col-lg-3\"></div>");
    var $name_img = $(String.format("<img class=\"img-circle-normal\" src=\"{0}\">", UrlBuilder.ImageUrl("user-shape.svg")));
    var $name_name = $(String.format("<p>{0}</p>", memberInfo.Name));
    $name.append($name_img);
    $name.append($name_name);
    $supeManContainer.append($name);

    var $level = $("<div class=\"col-lg-2\"></div>");
    var $level_img = $(String.format("<img class=\"img-square-normal\" src=\"{0}\"\ title=\"{1}\">", UrlBuilder.ImageUrl(memberMedalInfo.Image), memberMedalInfo.MedalName));
    $level.append($level_img);
    $supeManContainer.append($level);

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

    $supeManContainer.append($contact);

    $("#superman-list").append($supeManContainer);
}

function AcceptMission(superManId, missionId) {
    var postData = {
        MissionId: missionId,
        MemberId: head.memberInfo.MemberId,
        SuperManId: superManId
    }

    $.ajax({
        url: Global.Api.MissionStart,
        type: "post",
        dataType: "json",
        data: postData,
        success: function (data) {
            window.location.href = "/mission/AcceptHelp?id=" + missionId;
        }
    });
}