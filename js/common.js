$(document).bind("mobileinit", function() {
    //disable ajax nav
    $.mobile.ajaxLinksEnabled = false;
    $.mobile.ajaxFormsEnabled = false;
    $.mobile.ajaxEnabled = false;
});

function loadData(data){
    ko.cleanNode(document.getElementById("homepage"));
    viewModel = ko.mapping.fromJS(data);
    ko.applyBindings(viewModel, document.getElementById("homepage"));
    ko.mapping.fromJS(data, viewModel);
}

