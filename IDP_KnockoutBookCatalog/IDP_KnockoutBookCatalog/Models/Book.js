var app = window.app || {};
app.Book = function (isbn, title, pages, rate, date, authors) {
    'use strict';
    this.ISBN = ko.observable(isbn);
    this.Title = ko.observable(title);
    this.AmountOfPages = ko.observable(pages);
    this.Rate = ko.observable(rate);
    this.Date = ko.observable(date);
    this.Authors = ko.observableArray(authors);

    this.isChanged = ko.observable(false);
    this.UnchangedBook = undefined;
};
// тут реализовать поиск по имени проперти и по ключам можно
app.Book.prototype.trackBookChanges = function () {
    if (this.UnchangedBook === undefined) {
        this.isChanged(false);
        return;
    }
    if (this.ISBN() !== this.UnchangedBook.ISBN) {
        this.isChanged(true);
        return;
    }
    if (this.Title() !== this.UnchangedBook.Title) {
        this.isChanged(true);
        return;
    }
    if (this.AmountOfPages() !== this.UnchangedBook.AmountOfPages) {
        this.isChanged(true);
        return;
    }
    if (this.Rate() !== this.UnchangedBook.Rate) {
        this.isChanged(true);
        return;
    }
    this.isChanged(false);
    return;
};