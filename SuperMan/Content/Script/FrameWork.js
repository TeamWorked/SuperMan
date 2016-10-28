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