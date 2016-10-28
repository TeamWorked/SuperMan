var popoverList = ["Area", "Type1", "Type2", "Type3", "Type4", "Other"];

$.each(popoverList, function (index, value) {
    $("#" + value).popover({
        placement: 'bottom',
        html: 'true',
        content: GetPopoverContent(value),
        trigger: 'manual',
        title: $("#" + value).html() + '<a href="javascript:void(0)" onclick="ClosePopover(\'' + value + '\')"><span class="glyphicon glyphicon-remove-circle"></span></a>',
        animation: false,
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    })
    .on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");

        $(this).siblings(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    })
    .on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide")
            }
        }, 100);
    })
    .on("shown.bs.popover", function () {
        var _this = this;
        $('.popover-content button').bind('click', function () {
            BuildFilterTag(this);
            $(_this).popover('hide');
        });
    });
});

function GetPopoverContent(value) {
    return $("#" + value + "-content").html();
}

function ClosePopover(o) {
    $('#' + o).popover('hide');
}

function BuildFilterTag(element) {
    var $search_filter = $('#search-filter');
    var $tag_close = $('<a href="javascript:void(0)" class="close">&times;</a>');
    var $tag_filter = $('<div class="tag-filter"><span>' + $(element).text() + '</span></div>');
    $tag_filter.append($tag_close);
    $search_filter.append($tag_filter);
    $search_filter.parent().show();

    $tag_close.bind('click', function () {
        $(this).parent().remove();
        if ($('#search-filter .tag-filter').length == 0) {
            $search_filter.parent().hide();
        }
    });
}

