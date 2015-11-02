//$(document).bind("mobileinit", function() {
//    //disable ajax nav
//    $.mobile.ajaxLinksEnabled = false;
//    $.mobile.ajaxFormsEnabled = false;
//    $.mobile.ajaxEnabled = false;
//});
$.mobile.pageLoadErrorMessage = '网络问题';
$.mobile.transitionFallbacks.slideout ="none"


ko.bindingHandlers.ext = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        for (var handler in value) {

            if (value.hasOwnProperty(handler)) {
                if (typeof viewModel[value[handler]] == 'undefined') {
                    viewModel[value[handler]] = ko.observable();
                }

                ko.bindingHandlers[handler].update(element, function () { return viewModel[value[handler]]; });
            }
        }
    }
};



var emptyVar;
$(document).ready(function () {

    //var viewInfo = {
    //    info1: ko.observable(emptyVar),
    //    table1: ko.observableArray(emptyVar),
    //    table2: ko.observableArray(emptyVar)
    //};
    //ko.applyBindings(viewInfo);
    //var table1Data = [{lj:1,zds:2},{lj:3,zds:'3213213你好吗'}];
    //viewInfo.table1(table1Data);
    //
    //var object = {val:3213213213211,name:'name'};
    //viewInfo.info1(object);
    //
    //var table2Data = [{lj:'3211111132133213你好吗',zds:2},{lj:3,zds:'3213213你好吗'}];
    //viewInfo.table2(table2Data);


    var data = {val:3213213213211,name:'name',table1:[{lj:1,zds:2},{lj:3,zds:'3213213你好吗'}], table2:[{lj:'3211111132133213你好吗',zds:2},{lj:3,zds:'3213213你好吗'}] };
    var viewModel = ko.mapping.fromJS(emptyVar);
    //ko.applyBindings(viewModel);
    ko.mapping.fromJS(data, viewModel);



});