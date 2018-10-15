var KnockoutDocs = Base.extend({
    constructor: function(){
        this.items = ko.observableArray();
        this.selectedItem = ko.observable();
        
        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);

        this.createDocument = this.createDocument.bind(this);
        this.createSpreadsheet = this.createSpreadsheet.bind(this);
    },
    addItem: function(item){
        this.items.push(item);
        this.selectedItem(item);
    },
    editItem: function(item){
        this.selectedItem(item);
    },
    createDocument: function(){
        this.addItem(new Document('[New document]', ''));
    },
    createSpreadsheet: function(){
        this.addItem(new Spreadsheet('New spreadsheet', 5, 3));
    }
});