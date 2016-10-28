$("div.show-mission").on("click", function () {
    $("#mission-info").fadeIn("slow");
});

$("div.hide-mission").on("click", function () {
    $("#mission-info").fadeOut("slow");
});

var markerCluster;

var Icon = {
    tag_work: {
        url: UrlBuilder.ImageUrl("tag_work.png"),
        size: new google.maps.Size(36, 48),
        scaledSize: new google.maps.Size(36, 48), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    },
    tag_help: {
        url: UrlBuilder.ImageUrl("tag_help.png"),
        size: new google.maps.Size(36, 48),
        scaledSize: new google.maps.Size(36, 48), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    },
    tag_join: {
        url: UrlBuilder.ImageUrl("tag_join.png"),
        size: new google.maps.Size(36, 48),
        scaledSize: new google.maps.Size(36, 48), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    },
    tag_join2: {
        url: UrlBuilder.ImageUrl("tag_join2.png"),
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
                    icon: Icon.tag_help,
                    title: mapMakers[i].MissionType.toString(),
                    id: mapMakers[i].MissionId
                });
                break;
            case 2:
                marker = new google.maps.Marker({
                    position: latLng,
                    icon: Icon.tag_work,
                    title: mapMakers[i].MissionType.toString(),
                    id: mapMakers[i].MissionId
                });
                break;
            case 3:
                marker = new google.maps.Marker({
                    position: latLng,
                    icon: Icon.tag_join,
                    title: mapMakers[i].MissionType.toString(),
                    id: mapMakers[i].MissionId
                });
                break;
            case 4:
                marker = new google.maps.Marker({
                    position: latLng,
                    icon: Icon.tag_join2,
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

            $("div.show-mission").trigger("click");
        });
    });
}

function RenderMissionDetail(data) {
    $("#mission-title").html(data.Title);
    $("#mission-detail").html(data.Description);
    $("#missoin-reward").html(data.Star);
}

function GetSearchResult(func) {

    $.ajax({
        url: Global.Api.MissionSearch,
        data: {'request.maxSize': 50},
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
            RenderMissionDetail(data.MissionCollection[0]);
        }
    });
}