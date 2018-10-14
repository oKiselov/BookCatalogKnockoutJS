var Spreadsheet = Base.extend({
    templateName: "spreadsheet-template",
    constructor: function(title, numRows, numCols){
        this.title = ko.observable(title);
        this.numRowsc = ko.observable(numRows);
        this.numCols = ko.observable(numCols);

        this.rows = ko.observableArray();
    },
    init: function(){
var row;
var cell;
var rowIndex;
var colIndex;

for(rowIndex = 0; rowIndex < this.numRows(); rowIndex++)
        row = {cells: ko.observableArray()};
        for(colIndex = 0; colIndex < this.numCols(); colIndex++){
        cell = {value: ko.observable()};
            row.cells.push(cell);
        }
        this.cells.push(row);
    }


});