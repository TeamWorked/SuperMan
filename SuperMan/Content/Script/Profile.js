var pf = new Vue({
    el: "#container",
    data: {
        memberInfo: {},
        helps: [],
        gives: {},
        helps_history: {},
        gives_history: {}
    },
    methods: {
        create: function () {
            
        },
        getMissionImage: function (type) {
            var tmp = MissionTypeList.filter(function (x) {
                return x.Index == type
            });

            return tmp.length>0? "../Content/Image/" + tmp[0].Image: "";
        }
    },
    computed: {},
    filters: {
        dateTimeFormat: function (value) {
            if (!value) return ''
            value = value.toString();
            var tmp = new Date(value);
            return tmp.Format("Y-m-d H:i:s");
        }
    }
})

$.getJSON("http://52.198.189.19:2453/api/member/100000248501818", function (r) { 
    pf.memberInfo = r;
})

$.getJSON("http://52.198.189.19:2453/api/mission/help/100000248501818/active", function (r) {
    pf.helps = r.MissionCollection;
})

$.getJSON("http://52.198.189.19:2453/api/mission/give/100000248501920/active", function (r) {
    pf.gives = r.MissionCollection;
})

$.getJSON("http://52.198.189.19:2453/api/mission/help/100000248501818/complete", function (r) {
    pf.helps_history = r.MissionCollection;
})

$.getJSON("http://52.198.189.19:2453/api/mission/give/100000248501920/complete", function (r) {
    pf.gives_history = r.MissionCollection;
})