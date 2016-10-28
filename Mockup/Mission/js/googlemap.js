var infowindow = new google.maps.InfoWindow({});
var geocoder = new google.maps.Geocoder();
var map = null;

function showPosition() {
    var center = new google.maps.LatLng(24.1981, 120.6267);

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    var data = [
        { latitude: 24.1981, longitude: 120.6267 },
        { latitude: 24.1620, longitude: 120.6404 },
        { latitude: 24.1760, longitude: 120.6470 },
        { latitude: 24.196436, longitude: 120.543454 },
        { latitude: 24.181015, longitude: 120.545292 },
        { latitude: 24.197154, longitude: 120.523584 },
        { latitude: 24.189514, longitude: 120.512417 },
        { latitude: 24.146845, longitude: 120.645157 },
        { latitude: 24.145183, longitude: 120.646917 },
        { latitude: 24.145875, longitude: 120.644701 },
        { latitude: 24.144960, longitude: 120.629129 },
        { latitude: 24.139321, longitude: 120.584154 },
        { latitude: 24.186072, longitude: 120.661487 },
        { latitude: 24.152009, longitude: 120.682258 },
    ];

    var markers = [];

    var icon = {
        //url: "http://wfarm1.dataknet.com/static/resources/icons/set105/7ce3e2c.png", // url
        url: "image/tag_work.png",
        size: new google.maps.Size(36, 48),
        scaledSize: new google.maps.Size(36, 48), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    var icon_tool = {
        //url: "http://wfarm1.dataknet.com/static/resources/icons/set105/7ce3e2c.png", // url
        url: "image/tag_help.png",
        size: new google.maps.Size(36, 48),
        scaledSize: new google.maps.Size(36, 48), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    var icon_join = {
        //url: "http://wfarm1.dataknet.com/static/resources/icons/set105/7ce3e2c.png", // url
        url: "image/tag_join.png",
        size: new google.maps.Size(36, 48),
        scaledSize: new google.maps.Size(36, 48), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    var icon_join2 = {
        //url: "http://wfarm1.dataknet.com/static/resources/icons/set105/7ce3e2c.png", // url
        url: "image/tag_join2.png",
        size: new google.maps.Size(36, 48),
        scaledSize: new google.maps.Size(36, 48), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    for (var i = 0; i < data.length; i++) {
        var dataPhoto = data[i];
        var latLng = new google.maps.LatLng(dataPhoto.latitude,
            dataPhoto.longitude);
        if ((i % 5) == 0) {
            var marker = new google.maps.Marker({
                position: latLng,
                icon: icon,
            });
        }
        else if ((i % 3) == 0) {
            var marker = new google.maps.Marker({
                position: latLng,
                icon: icon_join,
            });
        }
        else if ((i % 2) == 0) {
            var marker = new google.maps.Marker({
                position: latLng,
                icon: icon_join2,
            });
        }
        else {
            var marker = new google.maps.Marker({
                position: latLng,
                icon: icon_tool,
            });
        }

        markers.push(marker);

        google.maps.event.addListener(marker, "click", function () {
            infowindow.content += "<div>Something<\/div>";
            infowindow.setPosition(marker.position);
            infowindow.open(map, this);

            // $('#myModal').modal('show');
            // $('#myModal').css({ 'margin-top': window.pageYOffset - $('#myModal').height() / 2, 'top': '50%' });
            // $('#myModal').css({ 'margin-left': window.pageXOffset - $('#myModal').width() / 2, 'left': '50%' });
        });

    }
    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://googlemaps.github.io/js-marker-clusterer/images/m' });

    // user location 
    //console.log(position.coords.latitude + "," + position.coords.longitude);
    google.maps.event.addListener(marker, "click", function () {
        infowindow.setContent('Super Man');
        infowindow.setPosition(marker.position);
        infowindow.open(map, this);
    });

    google.maps.event.addListener(map, 'click', function (event) {
        //alert("Latitude: " + event.latLng.lat() + " " + ", longitude: " + event.latLng.lng());
    });

    markerCluster.addMarker(marker);
};

function initialize() {
    //Get user position
    navigator.geolocation.getCurrentPosition(showPosition);
}

// for select user own position
function showUserClickPanel() {
    var center = new google.maps.LatLng(24.1981, 120.6267);

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    var marker = null;

    var icon = {
        url: "http://wfarm1.dataknet.com/static/resources/icons/set105/7ce3e2c.png", // url
        //url: "image/FamilyWork.png",
        size: new google.maps.Size(36, 48),
        scaledSize: new google.maps.Size(36, 48), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    google.maps.event.addListener(map, 'click', function (event) {
        //call function to create marker
        if (marker) {
            marker.setMap(null);
            marker = null;
        }

        marker = createMarker(event.latLng, "name", "<b>Location</b><br>" + event.latLng);

        var markerPosition = marker.getPosition();
        // map to center
        //map.setCenter(markerPosition);
        
        geocoder.geocode({
            'latLng': markerPosition
        }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results) {
                    // 將取得的資訊傳入 marker infowindow.
                    infowindow.setContent(results[1].formatted_address);
                    infowindow.open(map, marker);
                    
                    $("#missionAddress").val(results[1].formatted_address)
                }
            } else {
                alert("Reverse Geocoding failed because: " + status);
            }
        });
    });
};

// A function to create the marker and set up the event window function 
function createMarker(latlng, name) {
    //var contentString = html;

    var icon = {
        url: "image/point.png", // url
        //url: "image/FamilyWork.png",
        size: new google.maps.Size(36, 60),
        scaledSize: new google.maps.Size(36, 60), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 60) // anchor
    };

    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: icon,
        zIndex: Math.round(latlng.lat() * -100000) << 5
    });

    google.maps.event.addListener(marker, 'click', function () {
        $("#missionlat").val(marker.position.lat());
        $("#missionlng").val(marker.position.lng());
        //infowindow.setContent(contentString); 
        //infowindow.open(map,marker);
    });
    google.maps.event.trigger(marker, 'click');
    return marker;
}
//end

//google.maps.event.addDomListener(window, 'load', showPosition);