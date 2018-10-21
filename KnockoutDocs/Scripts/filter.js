var Filter = Base.extend ({
    constructor: function() {
        this.showDocuments = ko.observable(true);
        this.showSpreadsheets = ko.observable(true);
        this.textFilter = ko.observable();
    },
    itemMatchesFilter: function (item) {
        if (item instanceof Document && !this.showDocuments()) {
            return false;
        }
        if (item instanceof Spreadsheet && !this.showSpreadsheets()) {
            return false;
        }

        var textFilter = this.textFilter();
        if (!textFilter) {
            // no filter specified
            return true;
        }

        return item.matchesTextFilter(textFilter);
    }
});