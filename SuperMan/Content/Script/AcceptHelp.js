function initMap(mission) {
    var center = new google.maps.LatLng(mission.Latitude, mission.Longitude);
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    });

    var locationIcon;
    switch (mission.MissionType) {
        case 1001:
            locationIcon = Icon.house;
            break;
        case 1002:
            locationIcon = Icon.maintain;
            break;
        case 1003:
            locationIcon = Icon.service;
            break;
        case 1004:
            locationIcon = Icon.together;
            break;
        case 1005:
            locationIcon = Icon.transport;
            break;
        default:
    }

    marker = new google.maps.Marker({
        position: center,
        icon: locationIcon,
        map: map
    });

    marker.setAnimation(google.maps.Animation.BOUNCE);

    //if (navigator.geolocation) {
    //    navigator.geolocation.getCurrentPosition(function (position) {
    //        var pos = {
    //            lat: position.coords.latitude,
    //            lng: position.coords.longitude
    //        };

    //        map.setCenter(pos);
    //    }, function () {
    //        handleLocationError(true, infoWindow, map.getCenter());
    //    });
    //} else {
    //    // Browser doesn't support Geolocation
    //    handleLocationError(false, infoWindow, map.getCenter());
    //}
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

            initMap(mission);
            MissionStateInit(mission.Status);
            GetSuperManList(missionId, mission.SuperManId);

            setInterval(function () {
                GetSuperManList(missionId, mission.SuperManId);
            }, 5000);

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
                // filter
                var sellerList = [];
                var normalList = [];
                $.each(data.MsgReqeustList, function (i, v) {
                    if (v.MemberInfo != null && v.MemberInfo.IsBest) {
                        sellerList.push(v);
                    }

                    if (v.MemberInfo != null && !v.MemberInfo.IsBest) {
                        normalList.push(v);
                    }
                });

                if (superManId == null) {
                    $("#superman-list").show();
                    if (sellerList.length > 0 && normalList.length > 0) {
                        $("#superman-list hr").show();
                    }
                    RenderSuperManList(sellerList, "#superman-list-seller");
                    RenderSuperManList(normalList, "#superman-list-normal");
                } else {
                    RenderSelectedSuperMan(data.MsgReqeustList, superManId);
                }
            } else {
                var $wait = $("<div class=\"well\" style=\"text-align:center\">等待超人救援中...</div>");
                $("#superman-wait").html($wait);
                $("#superman-list").show();
            }
        }
    });
}

function RenderSuperManList(superManList, container) {
    if (superManList.length != 0) {
        $(container).show();
    }

    $(container + " .list-container").empty();
    $.each(superManList, function (i, v) {
        var memberInfo = v.MemberInfo;
        if (memberInfo != null) {

            var $content = $("<div class=\"well row\"></div>");

            if (memberInfo.Good != 0) {
                var eva = memberInfo.Good * 100 / (memberInfo.Good + memberInfo.Bad);
                var $eva_bar = $(String.format("<div class=\"row\"><div class=\"eva-container\" data-toggle=\"tooltip\" title=\"Good / Bad\"><div class=\"evabar\" style=\"width:{0}%\"></div></div></div>", eva));
                $content.append($eva_bar);
            }

            ///////////////////////
            var $name = $("<div class=\"col-lg-3\"></div>");
            var $name_img = $(String.format("<img class=\"img-circle-normal\" src=\"{0}\">", UrlBuilder.ImageUrl("user-shape.svg")));
            var $name_name = $(String.format("<p>{0}</p>", memberInfo.Name));
            $name.append($name_img);
            $name.append($name_name);
            ///////////////////////


            //////////////////////
            var $level = $("<div class=\"col-lg-2\"></div>");
            if (memberInfo.MemberMedalInfo != null) {
                var memberMedalInfo = memberInfo.MemberMedalInfo[0];
                var $level_img = $(String.format("<img class=\"img-square-normal\" src=\"{0}\"\ title=\"{1}\">", UrlBuilder.ImageUrl(memberMedalInfo.Image), memberMedalInfo.MedalName));
                $level.append($level_img);
            }

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

            $(container + " .list-container").append($content);
            $(".eva-container").tooltip();
        }
    });
}

function RenderSelectedSuperMan(superManList, superManId) {
    var memberInfo = null;
    var memberMedalInfo = null;
    $.each(superManList, function (i, v) {
        if (v.MemberId == superManId) {
            memberInfo = v.MemberInfo;
            if (memberInfo.MemberMedalInfo != null) {
                memberMedalInfo = memberInfo.MemberMedalInfo[0];
            }

            return false;
        }
    });

    if (memberInfo == null) {
        return;
    } else {
        $("#evaluation").show();
    }

    $supeManContainer = $("<div class=\"well row\"></div>");

    if (memberInfo.Good != 0) {
        var eva = memberInfo.Good * 100 / (memberInfo.Good + memberInfo.Bad);
        var $eva_bar = $(String.format("<div class=\"row\"><div class=\"eva-container\" data-toggle=\"tooltip\" title=\"Good / Bad\"><div class=\"evabar\" style=\"width:{0}%\"></div></div></div>", eva));
        $supeManContainer.append($eva_bar);
    }

    var $name = $("<div class=\"col-lg-3\"></div>");
    var $name_img = $(String.format("<img class=\"img-circle-normal\" src=\"{0}\">", UrlBuilder.ImageUrl("user-shape.svg")));
    var $name_name = $(String.format("<p>{0}</p>", memberInfo.Name));
    $name.append($name_img);
    $name.append($name_name);
    $supeManContainer.append($name);

    var $level = $("<div class=\"col-lg-3\"></div>");
    if (memberMedalInfo != null) {
        var $level_img = $(String.format("<img class=\"img-square-normal\" src=\"{0}\"\ title=\"{1}\">", UrlBuilder.ImageUrl(memberMedalInfo.Image), memberMedalInfo.MedalName));
        $level.append($level_img);
    }
   
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

    $("#superman-selected").html($supeManContainer);
    $(".eva-container").tooltip();
}

function AcceptMission(superManId, missionId) {
    // /api/reqeust/answer

    var anserData = {
        MemberId: "123",
        Title: "",
        Detail: "",
        MissionId: 100000027,
        Ref_MsgReqeustId: 10000035,
        Accept: 1
    }

    $.ajax({
        url: Global.Api.ReqeustAnswer,
        type: "post",
        dataType: "json",
        data: postData,
        success: function (data) {
            window.location.href = "/mission/AcceptHelp?id=" + missionId;
        }
    });


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

function SendEvaluation(btn) {
    var eva_value = $(".eva-choice:checked").val();
    $(btn).attr("disabled", "disable");
    $(btn).removeClass("btn-primary").addClass("btn-success");
    $(btn).text("評價已送出");

    $eva = $(String.format("<p class=\"form-control-static\">{0}</p>", eva_value));
    $("#eva-choice-container").html($eva);
    SetMissionState();
}

function SetMissionState() {
    $('.progress .circle').removeClass().addClass('circle');
    $('.progress .bar').removeClass().addClass('bar');

    var index = 4;

    $('.progress .circle:nth-of-type(' + index + ')').addClass('active');

    for (var i = 1; i < index; i++) {
        $('.progress .circle:nth-of-type(' + i + ')').addClass('done');
        $('.progress .bar:nth-of-type(' + i + ')').addClass('done');
        $('.progress .circle:nth-of-type(' + i + ') .label').html('&#10003;');
    }

    $('.progress .bar:nth-of-type(' + (index - 1) + ')').addClass('active');
}

$(".eva-choice").on("click", function () {
    $("#eva-btn").removeAttr("disabled");
});