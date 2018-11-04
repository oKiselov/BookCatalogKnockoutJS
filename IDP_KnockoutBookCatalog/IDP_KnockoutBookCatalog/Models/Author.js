var app = window.app || {};
app.Author = function (id, firstName, lastName) {
    'use strict';
    // main properties
    this.Id = ko.observable(id);
    this.FirstName = ko.observable(firstName);
    this.LastName = ko.observable(lastName);

    // UI properties
    this.IsExpanded = ko.observable(false);

    // tracking the Author
    this.IsChanged = ko.observable(false);
    this.UnchangedAuthor = undefined; 

    // properties for Author's books
    this.BooksCatalog = ko.observableArray([]);
    this.BooksCatalogModified = ko.pureComputed(function () {
        return ko.utils.arrayFilter(this.BooksCatalog(), function (item) {
            return item.IsChanged();
        });
    }, this);
    this.IsBooksCatalogModified = ko.pureComputed(function () {
        return this.BooksCatalogModified().length > 0;
    }, this);
};
app.Author.prototype.trackAuthorChanges = function () {
    if (this.FirstName() === this.UnchangedAuthor.FirstName && this.LastName() === this.UnchangedAuthor.LastName) {
        this.IsChanged(false);
    }
    else {
        this.IsChanged(true);
    }
};