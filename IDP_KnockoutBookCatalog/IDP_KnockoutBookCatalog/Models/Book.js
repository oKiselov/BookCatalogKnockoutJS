var app = window.app || {};
app.Book = function (isbn, title, pages, rate, date, authors) {
    'use strict';
    this.ISBN = ko.observable(isbn);
    this.Title = ko.observable(title);
    this.AmountOfPages = ko.observable(pages);
    this.Rate = ko.observable(rate);
    this.Date = ko.observable(date);
    this.Authors = ko.observableArray(authors);

    // UI properties
    this.IsChanged = ko.observable(false);
    this.UnchangedBook = undefined;
};
app.Book.prototype.trackBookChanges = function () {
    if (this.UnchangedBook === undefined) {
        this.IsChanged(true);
    }
    else if(this.Title() === this.UnchangedBook.Title
        && this.AmountOfPages() === this.UnchangedBook.AmountOfPages
        && this.Rate() === this.UnchangedBook.Rate
        && this.Date() === this.UnchangedBook.Date) {
        this.IsChanged(false);
    }
    else {
        this.IsChanged(true);
    }
};