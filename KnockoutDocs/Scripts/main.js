// jquery on load 
$(function(){
var viewModel = new KnockoutDocs();
viewModel.addItem(new Document("hello", "world"));
viewModel.addItem(new Document("goodbye", "world"));
viewModel.addItem(new Spreadsheet("Spreadsheet", 5, 5));

ko.applyBindings(viewModel);
});