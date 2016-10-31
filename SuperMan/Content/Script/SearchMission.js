$("#show-mission").on("click", function () {
    setTimeout(function () {
        $("#show-mission").show()
    }, 1000);

    $("#mission-info").fadeIn("slow");
});

$("div.hide-mission").on("click", function () {
    $("#mission-info").fadeOut("slow");
});

var markerCluster;

var Icon = {
    house: {
        url: UrlBuilder.ImageUrl("marker-house.png"),
        size: new google.maps.Size(36, 48),
        scaledSize: new google.maps.Size(36, 48), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    },
    maintain: {
        url: UrlBuilder.ImageUrl("marker-maintain.png"),
        size: new google.maps.Size(36, 48),
        scaledSize: new google.maps.Size(36, 48), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    },
    together: {
        url: UrlBuilder.ImageUrl("marker-together.png"),
        size: new google.maps.Size(36, 48),
        scaledSize: new google.maps.Size(36, 48), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    },
    transport: {
        url: UrlBuilder.ImageUrl("marker-transport.png"),
        size: new google.maps.Size(36, 48),
        scaledSize: new google.maps.Size(36, 48), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    },
    service: {
        url: UrlBuilder.ImageUrl("marker-service.png"),
        size: new google.maps.Size(36, 48),
        scaledSize: new google.maps.Size(36, 48), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    }
}

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
            case 1:
                marker = new google.maps.Marker({
                    position: latLng,
                    icon: Icon.house,
                    title: mapMakers[i].MissionType.toString(),
                    id: mapMakers[i].MissionId
                });
                break;
            case 2:
                marker = new google.maps.Marker({
                    position: latLng,
                    icon: Icon.maintain,
                    title: mapMakers[i].MissionType.toString(),
                    id: mapMakers[i].MissionId
                });
                break;
            case 3:
                marker = new google.maps.Marker({
                    position: latLng,
                    icon: Icon.together,
                    title: mapMakers[i].MissionType.toString(),
                    id: mapMakers[i].MissionId
                });
                break;
            case 4:
                marker = new google.maps.Marker({
                    position: latLng,
                    icon: Icon.transport,
                    title: mapMakers[i].MissionType.toString(),
                    id: mapMakers[i].MissionId
                });
                break;
            case 5:
                marker = new google.maps.Marker({
                    position: latLng,
                    icon: Icon.service,
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

function RenderMissionDetail(data, mId) {
    $("#mission-title").html(data.Title);
    $("#mission-detail").html(data.Description);
    $("#missoin-reward span").html(data.Star);
    var $button = $("<button type=\"button\" class=\"btn btn-success\" onclick=\"AskRequest(" + mId + ")\">Accept Mission</button>");
    $("#mission-accept").html($button);
}

function AskRequest(mid) {
    // wait for modify
    var postData = {
        MemberId: 36445567,
        Title: "GGGGG",
        Detail: "GGGGGGGG",
        MissionId: mid
    }

    $("#mission-accept button").popover({
        html: true,
        content: function () {
            return "Mission request has been sent!";
        }
    });

    $.ajax({
        url: Global.Api.MissionAsk,
        type: "post",
        dataType: "json",
        data: postData,
        success: function (data) {
            $("#mission-accept button").popover("toggle");
        }
    });
}

function GetSearchResult(func) {

    $.ajax({
        url: Global.Api.MissionSearch,
        data: { 'request.maxSize': 50 },
        success: function (data) {
            func(data.MapMakers);
        }
    });
}

function GetMissionDetail(Id) {
    $.ajax({
        // wait fo modify
        url: Global.Api.MissionDetail + 10000000,
        success: function (data) {
            RenderMissionDetail(data.MissionCollection[0], 10000010);
        }
    });
}