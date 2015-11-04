$(document).bind("mobileinit", function() {
    $.mobile.ajaxLinksEnabled = false;
    $.mobile.ajaxFormsEnabled = false;
    $.mobile.ajaxEnabled = false;
});

(function($){
    $.extend({
        ms_DatePicker: function (options) {
            var defaults = {
                YearSelector: "#sel_year",
                MonthSelector: "#sel_month",
                DaySelector: "#sel_day",
                HourSelector: "#sel_hour",
                DefaultDate : new Date()
            };



            var opts = $.extend({}, defaults, options);
            var $YearSelector = $(opts.YearSelector);
            var $MonthSelector = $(opts.MonthSelector);
            var $DaySelector = $(opts.DaySelector);
            var $HourSelector = $(opts.HourSelector);


            var yearNow = new Date().getFullYear();
            var startYear = yearNow -10;
            var yearSel = opts.DefaultDate.getFullYear();
            for (var i = yearNow; i >= startYear; i--) {
                var sed = yearSel==i?"selected":"";
                var yearStr = "<option value=\"" + i + "\" " + sed+">"+convertDateValueToString(i,0)+"</option>";
                $YearSelector.append(yearStr);
            }

            var monthSel =opts.DefaultDate.getMonth()+1;
            for (var i = 1; i <= 12; i++) {
                var sed = monthSel==i?"selected":"";
                var monthStr = "<option value=\"" + i + "\" "+sed+">"+convertDateValueToString(i,1)+"</option>";
                $MonthSelector.append(monthStr);
            }

            function BuildDay(isInit) {
                if ($YearSelector.val() == 0 || $MonthSelector.val() == 0) {
                    $DaySelector.html("");
                } else {
                    var preValue=  $DaySelector.val();
                    $DaySelector.html("");
                    var year = parseInt($YearSelector.val());
                    var month = parseInt($MonthSelector.val());
                    var dayCount = 0;
                    switch (month) {
                        case 1:
                        case 3:
                        case 5:
                        case 7:
                        case 8:
                        case 10:
                        case 12:
                            dayCount = 31;
                            break;
                        case 4:
                        case 6:
                        case 9:
                        case 11:
                            dayCount = 30;
                            break;
                        case 2:
                            dayCount = 28;
                            if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) {
                                dayCount = 29;
                            }
                            break;
                        default:
                            break;
                    }

                    var daySel = isInit? opts.DefaultDate.getDay()+1 :preValue;
                    for (var i = 1; i <= dayCount; i++) {
                        var sed = daySel==i?"selected":"";
                        var dayStr = "<option value=\"" + i + "\" "+sed+">" + convertDateValueToString(i,2) + "</option>";
                        $DaySelector.append(dayStr);
                    }

                    //alert($DaySelector.val() + "======"+preValue + "==========" +$DaySelector.prev()[0].innerHTML);
                    var preStr = $DaySelector.prev()[0].innerHTML;
                    if(preStr.length < 6 && $DaySelector.val()+"日" != preStr ) {
                        $(opts.DaySelector).val(1);
                        $DaySelector.prev()[0].innerHTML = "1日";
                    }
                }
            }

            var hourSel =opts.DefaultDate.getHours();
            for (var i = 0; i <= 23; i++) {
                var sed = hourSel==i?"selected":"";
                var hourStr = "<option value=\"" + i + "\" "+sed+">"+convertDateValueToString(i,3)+"</option>";
                $HourSelector.append(hourStr);
            }
            $MonthSelector.change(function () {
                BuildDay(false);

            });
            $YearSelector.change(function () {
                BuildDay(false);
            });
            BuildDay(true);
        } // End ms_DatePicker
    });
})(jQuery);

function convertDateValueToString(number,type){
    var endFix="";
    if(type==1) {
        endFix="月"
    }else if(type==2) {
        endFix="日"
    }else if(type==3) {
        endFix="点"
    }

    return number+endFix;
}

var viewModel;
function loadData(data){

    ko.cleanNode(document.getElementById("content"));
    viewModel = ko.mapping.fromJS(data);
    ko.applyBindings(viewModel, document.getElementById("content"));
    ko.mapping.fromJS(data, viewModel);

}

function loadJson(url){
    $.getJSON(httpPrefix+url, function(result){
        loadData(result);
    });
}

function loadForTable(url){
    $.getJSON(httpPrefix+url, function(result){
        viewModel.table(result.table);
    });
}

function joinDate(){

    var year = $("#sel_year").val();
    var month = $("#sel_month").val();
    var day = $("#sel_day").val();
    var hour = $("#sel_hour").val();

    var eyear = $("#end_sel_year").val();
    var emonth = $("#end_sel_month").val();
    var eday = $("#end_sel_day").val();
    var ehour = $("#end_sel_hour").val();

    var startTime = year+"-"+month+"-"+day+" "+hour;
    var endTime = eyear+"-"+emonth+"-"+eday+" "+ehour;
    return encodeURIComponent("startTime="+startTime+"&"+"endTime="+endTime);
}


var httpPrefix="http://www.zzsw.gov.cn:8088/"

