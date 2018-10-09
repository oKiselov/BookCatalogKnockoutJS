// jquery on load 
$(function(){
var doc1 = {
    title: ko.observable("Hello world"),
    body: ko.observable("Welcome to the world, my friends")  
};
var doc2 = {
    title: ko.observable("Bye world"),
    body: ko.observable("Bye world, my friends")  
};
var viewModel = {
    documents: ko.observableArray(),
    selectedItem: ko.observable(),
    editItem: function(doc){
        viewModel.selectedItem(doc);
    }
};

viewModel.documents.push(doc1);
viewModel.documents.push(doc2);


ko.applyBindings(viewModel);

});