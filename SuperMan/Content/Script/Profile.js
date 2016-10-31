var ProfileMissionList = Vue.extend({
    props: ["missions","is_give"],
    template: `
        <div class="row tab-pane fade in" id="help-tab">
            <div class ="col-lg-12 profile-list" v-for="(mission,index) in missions">
                <div class ="col-lg-2 profile_imgbox">
                    <a href="#" v-bind:title="mission.Title">
                        <img class ="image-mission" v-bind:src="getMissionImage(mission.MissionType)" />
                    </a>
                </div>
                <div class ="col-lg-10">
                    <div class ="profile-content-detail">
                        <a href="#" v-bind:title="mission.Title" v-text="mission.Title"></a>
                        <span class ="fire_left">{{mission.InDate | dateTimeFormat}}</span>
                        <p v-text="mission.Description"></p>
                    </div>
                    <div class ="profile-content-info">
                        <img class ="image-egg-small" src="../Content/Image/egg2.png" />
                        <span v-text="'x '+mission.Star"></span>
                        <button class ="btn btn-super pull-right" v-if="!is_give" v-text="'超人來囉 X'+mission.Applicants"></button>
                    </div>
                </div>
            </div>
        </div>`,
    methods: {
        getMissionImage: function (type) {
            var tmp = MissionTypeList.filter(function (x) {
                return x.Index == type
            });

            return tmp.length>0? "../Content/Image/" + tmp[0].Image: "";
        }
    },
    filters: {
        dateTimeFormat: function (value) {
            if (!value) return ''
            value = value.toString();
            var tmp = new Date(value);
            return tmp.Format("Y-m-d H:i:s");
        }
    }
});

Vue.component('profile-mission-list', ProfileMissionList);


var pf = new Vue({
    el: "#container",
    data: {
        memberInfo: {},
        medals:[],
        helps: [],
        gives: [],
        helps_history: [],
        gives_history: []
    },
    methods: {
        showMemberInfo: function (e) {
            $("#memberInfo").css({
                top: e.clientY-30,
                left: e.clientX-30
            }).fadeIn().on("mouseleave",function () {
                setTimeout(function () {
                    $(this).fadeOut().off("mouseleave");
                }.bind(this), 200);
            });
        }
    },
    computed: {}
})

$.getJSON("http://52.198.189.19:2453/api/member/100000248501818", function (r) { 
    pf.memberInfo = r;
})

$.getJSON("http://52.198.189.19:2453/api/profile/medal/100000248501818", function (r) {
    pf.medals = r;
})

$.getJSON("http://52.198.189.19:2453/api/profile/help/100000248501818/active", function (r) {
    pf.helps = r.MissionCollection;
})

$.getJSON("http://52.198.189.19:2453/api/profile/give/100000248501920/active", function (r) {
    pf.gives = r.MissionCollection;
})

$.getJSON("http://52.198.189.19:2453/api/profile/help/100000248501818/complete", function (r) {
    pf.helps_history = r.MissionCollection;
})

$.getJSON("http://52.198.189.19:2453/api/profile/give/100000248501920/complete", function (r) {
    pf.gives_history = r.MissionCollection;
})