//vue.js
var cm = new Vue({
    el: "#container",
    data: {
        memberID: head.memberInfo.MemberId,
        title: "",
        description: "",
        missionType: 0,
        missionTypeList:MissionTypeList,
        address: "",
        lat: 0,
        lng: 0,
        zipCode: "",
        star: 0,
        contact: "",
        propIDs: [],
        props: []
    }, 
    methods: {
        create: function () {
            //console.log(JSON.stringify({
            //    "MemberId": this.memberID,
            //    "Title": this.title,
            //    "Description": this.description,
            //    "MissionType": this.missionType,
            //    "Address": this.address,
            //    "Latitude": this.lat,
            //    "Longitude": this.lng,
            //    "ZipCode": this.zipCode,
            //    "Star": this.star,
            //    "Contact": this.contact,
            //    "PropIds": JSON.stringify(this.propIDs),
            //}))
            $.post("http://52.198.189.19:2453/api/mission/create", {
                "MemberId": this.memberID,
                "Title": this.title,
                "Description": this.description,
                "MissionType": this.missionType,
                "Address": this.address,
                "Latitude": this.lat,
                "Longitude": this.lng,
                "ZipCode": this.zipCode,
                "Star": this.star,
                "Contact": this.contact,
                "PropIds": JSON.stringify(this.propIDs),
            }, function (result) {
                console.log(result)
                if (result.Status.StatusCode == 0) {
                    //add success
                    //alert("success");
                    //$.alert('任務創建成功!');
                    $.alert({
                        title: '任務',
                        content: '任務創建成功!',
                        confirm: function(){
                            location.href = "/Mission/AcceptHelp?id=" + result.MissionId; // shorthand.
                        }
                    });
                }
                else {
                    // add fail
                    //alert("fail");
                    $.alert('任務創建失敗!');
                }
            }, "json")
        },
        chgPropID: function (id,e) {
            var index = this.propIDs.indexOf(id)
            if (index > -1)
                this.propIDs.splice(index, 1);
            else
                this.propIDs.push(id);

            var $this = $(e.currentTarget);
            if ($this.hasClass("btn-default")) 
                $this.removeClass("btn-default").addClass("btn-super");
            else 
                $this.removeClass("btn-super").addClass("btn-default");
        }
    },
    computed: {} 
})

$.getJSON("http://52.198.189.19:2453/api/shop/effect", function (r) {
    cm.props = r;
})

$.getJSON("http://52.198.189.19:2453/api/member/"+head.memberInfo.MemberId, function (r) {
    cm.contact = "信箱:" + r.Email + "\r\n" +
        "電話:" + r.Phone + "\r\n" +
        "Line:" + r.Line;
})

$("#filterbtn").hover(
  function () {
      $('#collapseExample').collapse('show');
  }, function () {
      //$('#collapseExample').collapse('hide');
  }
).click(
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
    //if (address.length > 14) {
    //    address = address.substr(0, 14);
    //}
    //$("#t-position > strong").text(address + " ...");
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
//$(".propsbtn").click(function (e) {
//    if ($(this).hasClass("btn-default")) {
//        $(this).removeClass("btn-default").addClass("btn-super");
//    }
//    else {
//        $(this).removeClass("btn-super").addClass("btn-default");
//    }
//    //console.log($(this).attr("class"));
//});
// END

// profile page
$(".btn-pref .btn").click(function () {
    $(".btn-pref .btn").removeClass("btn-super").addClass("btn-super-low");
    // $(".tab").addClass("active"); // instead of this do the below 
    $(this).removeClass("btn-super-low").addClass("btn-super");
});
// END


