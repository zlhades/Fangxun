//$(document).bind("mobileinit", function() {
//    //disable ajax nav
//    $.mobile.ajaxLinksEnabled = false;
//    $.mobile.ajaxFormsEnabled = false;
//    $.mobile.ajaxEnabled = false;
//});
$.mobile.pageLoadErrorMessage = '网络问题';
$.mobile.transitionFallbacks.slideout ="none"


var emptyVar;
$(document).ready(function () {

    var viewInfo = {
        info: ko.observable(emptyVar),
        table1: ko.observableArray(emptyVar),
        table2: ko.observableArray(emptyVar)
    };
    ko.applyBindings(viewInfo);
    var table1Data = [{lj:1,zds:2},{lj:3,zds:'3213213你好吗'}];
    viewInfo.table1(table1Data);

    var table2Data = [{lj:'3211111132133213你好吗',zds:2},{lj:3,zds:'3213213你好吗'}];
    viewInfo.table2(table2Data);

    var object = {val:3213213213211,name:'name'};
    viewInfo.info(object);


});