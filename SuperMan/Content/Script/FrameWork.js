// header icon tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

var UrlBuilder = {
    ImagePath: "../Content/Image/",
    ImageUrl: function (str) {
        return this.ImagePath + str;
    }
}

var MissionTypeList = [
    { Index: 1001, Title: "居家 / 除蟲", Image: "tag-house.svg" },
    { Index: 1002, Title: "專業 / 維修", Image: "tag-maintain.svg" },
    { Index: 1003, Title: "代客 / 服務", Image: "tag-service.svg" },
    { Index: 1004, Title: "揪團 / 出遊", Image: "tag-together.svg" },
    { Index: 1005, Title: "共乘 / 運送", Image: "tag-transport.svg" },
]

Date.prototype.Format = function (fmt) {
    var o = {
        "Y": this.getFullYear(),
        "y+": this.getFullYear(),
        "m": this.getMonth() + 1,                 //
        "d": this.getDate(),                    //
        "H": this.getHours(),                   //
        "i": this.getMinutes(),                 //
        "s": this.getSeconds(),                 //
        "S": this.getMilliseconds()             //
    };

    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                     o[k].toString().length == 1 ? "0" + o[k] : o[k] :
                     o[k].toString().substr(o[k].toString().length - RegExp.$1.length));
    return fmt;
};