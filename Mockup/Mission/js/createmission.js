var infowindow = new google.maps.InfoWindow({});
var map = null;

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
         
	     marker = createMarker(event.latLng, "name", "<b>Location</b><br>"+ event.latLng);
    });
};

// A function to create the marker and set up the event window function 
function createMarker(latlng, name) {
    //var contentString = html;
    
    var icon = {
        url: "http://wfarm1.dataknet.com/static/resources/icons/set105/7ce3e2c.png", // url
        //url: "image/FamilyWork.png",
        size: new google.maps.Size(50, 50),
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 50) // anchor
    };
   
    var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: icon,
            zIndex: Math.round(latlng.lat()*-100000)<<5
        });

    google.maps.event.addListener(marker, 'click', function() {
        //infowindow.setContent(contentString); 
        //infowindow.open(map,marker);
        });
    google.maps.event.trigger(marker, 'click');    
    return marker;
}

google.maps.event.addDomListener(window, 'load', showUserClickPanel);


$(document).ready(function () {
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();
    
    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);
    
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}