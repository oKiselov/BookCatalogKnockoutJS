var app = window.app || {};
app.Book = function (isbn, title, pages, rate, date, authors) {
    this.ISBN = ko.observable(isbn);
    this.Title = ko.observable(title);
    this.AmountOfPages = ko.observable(pages);
    this.Rate = ko.observable(rate);
    this.Date = ko.observable(date);
    this.Authors = ko.observableArray(authors);
};