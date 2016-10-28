//vue.js
var cm = new Vue({
    el: "#container",
    data: {
        memberID: 100000248501818,
        title: "",
        description: "",
        missionType: 0,
        address: "",
        lat: 0,
        lng: 0,
        zipCode: "",
        star: 0,
        contact: "",
        propIDs: [],
        props: [
            {
                "Id": 1001,
                "Name": "超人披風",
                "Description": "超人披風超人披風",
                "Minute": 30,
                "Image": "tag-maintain.svg",
                "Cost": 30
            },
            {
                "Id": 1002,
                "Name": "超人內褲",
                "Description": "超人內褲超人內褲",
                "Minute": 30,
                "Image": "tag-maintain.svg",
                "Cost": 30
            },
            {
                "Id": 1003,
                "Name": "超人電話亭",
                "Description": "超人電話亭超人電話亭",
                "Minute": 30,
                "Image": "tag-maintain.svg",
                "Cost": 30
            },
            {
                "Id": 1004,
                "Name": "超人手錶",
                "Description": "超人手錶超人手錶",
                "Minute": 30,
                "Image": "tag-maintain.svg",
                "Cost": 30
            }
        ]
    },
    methods: {
        create: function () {
            console.log(JSON.stringify({
                "MemberId": this.memberID,
                "Title": this.title,
                "Description": this.description,
                "MissionType": this.missionType,
                "Address": this.address,
                "Latitude": this.lat,
                "Longitude": this.lng,
                "ZipCode": this.zipCode,
                "Star": this.start,
                "Contact": this.contact,
                "PropIds": JSON.stringify(this.propIDs),
            }))
            $.post("http://52.198.189.19:2453/api/mission/create", {
                "MemberId": this.memberID,
                "Title": this.title,
                "Description": this.description,
                "MissionType": this.missionType,
                "Address": this.address,
                "Latitude": this.lat,
                "Longitude": this.lng,
                "ZipCode": this.zipCode,
                "Star": this.start,
                "Contact": this.contact,
                "PropIds": JSON.stringify(this.propIDs),
            }, function (result) {
                console.log(result)
                if (result.StatusCode == 0) {
                    //add success
                    alert("success");
                }
                else {
                    // add fail
                    alert("fail");
                }
            }, "json")
        },
        chgPropID: function (id) {
            var index = this.propIDs.indexOf(id)
            if (index > -1)
                this.propIDs.splice(index, 1);
            else
                this.propIDs.push(id);
        }
    },
    computed: {}
})


$("#filterbtn").hover(
  function () {
      $('#collapseExample').collapse('show');
  }, function () {
      //$('#collapseExample').collapse('hide');
  }
);

$("#filterbtn").click(
  function () {
      if ($('#collapseExample').is(":visible")) {
          $('#collapseExample').collapse('hide');
      }
      else {
          $('#collapseExample').collapse('show');
      }
  }
);

// BEGIN create mission js.
//Initialize tooltips
$('.nav-tabs > li a[title]').tooltip();

//Wizard
$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

    var $target = $(e.target);

    if ($target.parent().hasClass('disabled')) {
        return false;
    }
});

// button
$(".next-step").click(function (e) {
    if ($("#step1 > ul > li > button").is(e.toElement)) {
        if (!$("#missionlat").val() || !$("#missionlng").val()) {
            alert("請在地圖上選擇任務位置");
            return;
        }
    }

    setAddersss($("#missionAddress").val());

    var $active = $('.wizard .nav-tabs li.active');
    $active.next().removeClass('disabled');
    nextTab($active);
});

$(".prev-step").click(function (e) {

    var $active = $('.wizard .nav-tabs li.active');
    prevTab($active);

});

//image mission next
$(".image-mission.image-halo").click(function (e) {
    $(this).parent().siblings().find(".image-mission.image-halo").each(function () {
        $(this).attr("class", "image-mission image-halo")
    });

    $(this).attr("class", "image-mission image-halo active");
    setMissionType($(this).attr("src"), $(this).siblings("p").text(), $(this).attr("mission_type"));

    var $active = $('.wizard .nav-tabs li.active');
    $active.next().removeClass('disabled');
    nextTab($active);
});

//image egg next
$(".image-egg.image-halo").click(function (e) {
    $(this).parent().siblings().find(".image-egg.image-halo").each(function () {
        $(this).attr("class", "image-egg image-halo")
    });

    $(this).attr("class", "image-egg image-halo active");

    // custoemr egg
    if ($(this).attr("id") == "custom-egg") {
        $("#custom-egg-val").removeAttr('disabled').focus();
        $("#custom-egg-btn").removeAttr('style');
    }
    else {
        $("#custom-egg-val").attr('disabled', 'disabled');
        $("#custom-egg-btn").attr('style', 'display:none');

        setEgg($(this).siblings("p").text().substr(2, $(this).siblings("p").text().length));

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);
    }
});

// custom egg input submit .
$("#custom-egg-val").keypress(function (e) {
    code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
        e.preventDefault();
        if (checkEgg($("#custom-egg-val").val())) {
            setEgg($("#custom-egg-val").val());

            var $active = $('.wizard .nav-tabs li.active');
            $active.next().removeClass('disabled');
            nextTab($active);
        }
        else {
            $('#custom-egg-val').tooltip('show');
        }
    }
});

// custom egg btn submit.
$("#custom-egg-btn").click(function (e) {
    if (checkEgg($("#custom-egg-val").val())) {
        setEgg($("#custom-egg-val").val());

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);
    }
    else {
        $('#custom-egg-val').tooltip('show');
    }
});

function checkEgg(count) {
    if (count > 0 && (count % 5) == 0) {
        return true;
    }
    return false;
}

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}

function setPosition(lat, lng) {
    // call google api ... padding...
}

function setAddersss(address) {
    cm.address = address;
    cm.lat = $("#missionlat").val();
    cm.lng = $("#missionlng").val();
    cm.zipCode = $("#missionZipCode").val();
    if (address.length > 14) {
        address = address.substr(0, 14);
    }
    $("#t-position > strong").text(address + " ...");
}

function setMissionType(image, title, type) {
    $("#t-missionType > strong").text(title);
    $("#t-missionType > img").attr("src", image);
    cm.missionType = parseInt(type);
}

function setEgg(count) {
    $("#t-egg > strong").text("x " + count);
    cm.star = count;
}

// mission detail submit
$(".propsbtn").click(function (e) {
    if ($(this).hasClass("btn-default")) {
        $(this).removeClass("btn-default").addClass("btn-super");
    }
    else {
        $(this).removeClass("btn-super").addClass("btn-default");
    }
    //console.log($(this).attr("class"));
});
// END

// mission detail submit
$(".propsbtn").click(function (e) {
    if ($(this).hasClass("btn-default")) {
        $(this).removeClass("btn-default").addClass("btn-super");
    }
    else {
        $(this).removeClass("btn-super").addClass("btn-default");
    }
    console.log($(this).attr("class"));
});
// END

// profile page
$(".btn-pref .btn").click(function () {
    $(".btn-pref .btn").removeClass("btn-super").addClass("btn-super-low");
    // $(".tab").addClass("active"); // instead of this do the below 
    $(this).removeClass("btn-super-low").addClass("btn-super");
});
// END

// END


// for select user own position
function showUserClickPanel() {
    var center = new google.maps.LatLng(24.1981, 120.6267);

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
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

        var infowindow = new google.maps.InfoWindow({});
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({
            'latLng': markerPosition
        }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results) {
                    // 將取得的資訊傳入 marker infowindow.
                    infowindow.setContent(results[1].formatted_address);
                    infowindow.open(map, marker);
                }
            }
        })
    })
}

// profile page
$(".btn-pref .btn").click(function () {
    $(".btn-pref .btn").removeClass("btn-super").addClass("btn-super-low");
    // $(".tab").addClass("active"); // instead of this do the below 
    $(this).removeClass("btn-super-low").addClass("btn-super");
});
// END

//$.getJSON("http://52.198.189.19:2453/api/shop/effect", function (r) {
//    cm.props = r;
//})