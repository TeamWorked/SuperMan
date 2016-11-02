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
}

function InitGiveHelp(missionId) {
    // get mission detail
    $.ajax({
        url: Global.Api.MissionDetail + missionId,
        success: function (data) {
            var mission = data.MissionCollection[0];
            $("#mission-title p").html(mission.Title);
            $("#mission-detail p").html(mission.Description);
            $("#mission-reward span").html(mission.Star);

            initMap(mission);
            MissionStateInit(mission.Status);
            
            var memberInfo = mission.MemberInfo;

            var eva = memberInfo.Good * 100 / (memberInfo.Good + memberInfo.Bad);
            var $eva_bar = $(String.format("<div class=\"evabar\" style=\"width:{0}%\"></div>", eva))
            $("#eva").append($eva_bar);
            $(".eva-container").tooltip();

            $("#member-name").append(String.format("<p>{0}</p>", memberInfo.Name));

            if (memberInfo.MemberMedalInfo != null) {
                var $medal_img = $(String.format("<img class=\"img-square-normal\" src=\"{0}\"\ title=\"{1}\">", UrlBuilder.ImageUrl(memberInfo.MemberMedalInfo.Image), memberInfo.MemberMedalInfo.MedalName));
                $("#member-medal").append($medal_img);
            }

            $("#member-contact").append(String.format("<p>{0}</p>", memberInfo.Email));
            $("#member-contact").append(String.format("<p>{0}</p>", memberInfo.Phone));
            $("#member-contact").append(String.format("<p>{0}</p>", memberInfo.Line));

            //setInterval(function () {
            //    GetSuperManList(missionId, mission.SuperManId);
            //}, 5000);

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
            index = 1;
            break;
        case 'R':
            index = 2;
            break;
        case 'F':
            index = 4;
            break;
        default:
            index = 1;
    }

    $('.progress .circle:nth-of-type(' + index + ')').addClass('active');

    for (var i = 1; i < index; i++) {
        $('.progress .circle:nth-of-type(' + i + ')').addClass('done');
        $('.progress .bar:nth-of-type(' + i + ')').addClass('done');
        $('.progress .circle:nth-of-type(' + i + ') .label').html('&#10003;');
    }

    $('.progress .bar:nth-of-type(' + (index - 1) + ')').addClass('active');
}

function SendEvaluation(btn) {
    var eva_value = $(".eva-choice:checked").val();
    $(btn).attr("disabled", "disable");
    $(btn).removeClass("btn-primary").addClass("btn-success");
    $(btn).text("評價已送出");

    $eva = $(String.format("<p class=\"form-control-static\">{0}</p>", eva_value));
    $("#eva-choice-container").html($eva);
}

$(".eva-choice").on("click", function () {
    $("#eva-btn").removeAttr("disabled");
});
