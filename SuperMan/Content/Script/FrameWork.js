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

<<<<<<< HEAD
String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
=======
//string.format

//可在Javascript中使用如同C#中的string.format
//使用方式 : var fullName = String.format('Hello. My name is {0} {1}.', 'FirstName', 'LastName');
String.format = function () {
    var s = arguments[0];
    if (s == null) return "";
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = getStringFormatPlaceHolderRegEx(i);
        s = s.replace(reg, (arguments[i + 1] == null ? "" : arguments[i + 1]));
    }
    return cleanStringFormatResult(s);
}
//可在Javascript中使用如同C#中的string.format (對jQuery String的擴充方法)
//使用方式 : var fullName = 'Hello. My name is {0} {1}.'.format('FirstName', 'LastName');
String.prototype.format = function () {
    var txt = this.toString();
    for (var i = 0; i < arguments.length; i++) {
        var exp = getStringFormatPlaceHolderRegEx(i);
        txt = txt.replace(exp, (arguments[i] == null ? "" : arguments[i]));
    }
    return cleanStringFormatResult(txt);
}
//讓輸入的字串可以包含{}
function getStringFormatPlaceHolderRegEx(placeHolderIndex) {
    return new RegExp('({)?\\{' + placeHolderIndex + '\\}(?!})', 'gm')
}
//當format格式有多餘的position時，就不會將多餘的position輸出
//ex:
// var fullName = 'Hello. My name is {0} {1} {2}.'.format('firstName', 'lastName');
// 輸出的 fullName 為 'firstName lastName', 而不會是 'firstName lastName {2}'
function cleanStringFormatResult(txt) {
    if (txt == null) return "";
    return txt.replace(getStringFormatPlaceHolderRegEx("\\d+"), "");
>>>>>>> 9caff57325fd295353302af45635764c1cbcb405
}