$("#show-mission").on("click", function () {
    setTimeout(function () {
        $("#show-mission").show()
    }, 1000);

    $("#mission-info").fadeIn("slow");
});

$("div.hide-mission").on("click", function () {
    $("#mission-info").fadeOut("slow");
});

$("#search-type img").on("click", function () {
    if ($(this).attr("class") == "choice") {
        $(this).removeClass("choice");
    } else {
        $(this).addClass("choice");
    }
    GetSearchResult(RefreshMarkers);
});


var markerCluster;



function initialize() {
    //Get user position
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition() {
    // wait modify to user location
    var center = new google.maps.LatLng(24.1981, 120.6267);

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    });

    map.addListener('dragend', function () {
        GetSearchResult(RefreshMarkers);
    });

    map.addListener('zoom_changed', function () {
        GetSearchResult(RefreshMarkers);
    });

    // init map
    GetSearchResult(InitialMarkers);

    // user location 
    //console.log(position.coords.latitude + "," + position.coords.longitude);
    //google.maps.event.addListener(marker, "click", function () {
    //    infowindow.setContent('Super Man');
    //    infowindow.setPosition(marker.position);
    //    infowindow.open(map, this);
    //});

    //google.maps.event.addListener(map, 'click', function (event) {
    //    //alert("Latitude: " + event.latLng.lat() + " " + ", longitude: " + event.latLng.lng());
    //});

    //markerCluster.addMarker(marker);
};

function InitialMarkers(mapMakers) {
    SetMarkers(mapMakers);
}

function RefreshMarkers(mapMakers) {
    markerCluster.clearMarkers();
    SetMarkers(mapMakers);
}

function SetMarkers(mapMakers) {
    var markers = [];
    for (var i = 0; i < mapMakers.length; i++) {
        var latLng = new google.maps.LatLng(mapMakers[i].Latitude, mapMakers[i].Longitude);
        var marker = {};
        switch (mapMakers[i].MissionType) {
            case 1001:
                marker = new google.maps.Marker({
                    position: latLng,
                    icon: mapMakers[i].IsHighlight ? Icon.houseEX : Icon.house,
                    title: mapMakers[i].MissionType.toString(),
                    id: mapMakers[i].MissionId
                });
                break;
            case 1002:
                marker = new google.maps.Marker({
                    position: latLng,
                    icon: mapMakers[i].IsHighlight ? Icon.maintainEX : Icon.maintain,
                    title: mapMakers[i].MissionType.toString(),
                    id: mapMakers[i].MissionId
                });
                break;
            case 1004:
                marker = new google.maps.Marker({
                    position: latLng,
                    icon: mapMakers[i].IsHighlight ? Icon.togetherEX : Icon.together,
                    title: mapMakers[i].MissionType.toString(),
                    id: mapMakers[i].MissionId
                });
                break;
            case 1005:
                marker = new google.maps.Marker({
                    position: latLng,
                    icon: mapMakers[i].IsHighlight ? Icon.transportEX : Icon.transport,
                    title: mapMakers[i].MissionType.toString(),
                    id: mapMakers[i].MissionId
                });
                break;
            case 1003:
                marker = new google.maps.Marker({
                    position: latLng,
                    icon: mapMakers[i].IsHighlight ? Icon.serviceEX : Icon.service,
                    title: mapMakers[i].MissionType.toString(),
                    id: mapMakers[i].MissionId
                });
                break;
            default:
                return;
        }
        markers.push(marker);
    }

    MissionClickEvent(markers);

    var mcOptions = { gridSize: 50, maxZoom: 15, imagePath: 'https://googlemaps.github.io/js-marker-clusterer/images/m' };

    markerCluster = new MarkerClusterer(map, markers, mcOptions);
}

function MissionClickEvent(markers) {
    $.each(markers, function (i, v) {
        v.addListener('click', function () {
            $.each(markers, function (i, o) {
                if (v != o) {
                    o.setAnimation(null);
                }
            })

            v.setAnimation(google.maps.Animation.BOUNCE);
            // get mission detail info
            GetMissionDetail(v.id);

            $("#show-mission").trigger("click");
        });
    });
}

function RenderMissionDetail(data) {
    var memberInfo = data.MemberInfo;
    $("#mission-title").html(data.Title);
    $("#user-name").html(memberInfo.Name);
    $("#mission-detail").html(data.Description);
    $("#missoin-reward span").html(data.Star);
    var $button = $("<button type=\"button\" class=\"btn btn-primary\" onclick=\"AskRequest(this, " + data.MissionId + ")\">Give a hand</button>");
    $("#mission-accept").html($button);
}

function AskRequest(btn, missionId) {
    var postData = {
        MemberId: head.memberInfo.MemberId,
        Title: "",
        Detail: "",
        MissionId: missionId
    }

    $.ajax({
        url: Global.Api.MissionAsk,
        type: "post",
        dataType: "json",
        data: postData,
        success: function (data) {
            $(btn).attr("disabled", "disable");
            $(btn).removeClass("btn-primary").addClass("btn-success");
            $(btn).text("Success send help request");
        }
    });
}

function GetSearchResult(func) {
    var requestData = {
        'request.maxSize': 50,
        'request.missionType': GetSelectedMissionType()
    }

    $.ajax({
        url: Global.Api.MissionSearch,
        data: requestData,
        success: function (data) {
            func(data.MapMakers);
        }
    });
}

function GetSelectedMissionType() {
    var missionType = [];
    $.each($("#search-type img.choice"), function (i, v) {
        missionType.push($(v).data("type"));
    });

    return missionType.join(',');
}

function GetMissionDetail(Id) {
    $.ajax({
        url: Global.Api.MissionDetail + Id,
        success: function (data) {
            RenderMissionDetail(data.MissionCollection[0], Id);
        }
    });
}