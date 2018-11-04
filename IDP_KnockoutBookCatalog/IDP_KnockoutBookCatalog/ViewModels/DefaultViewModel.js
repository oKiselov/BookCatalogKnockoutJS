var app = window.app || {};
app.DefaultViewModel = (function (ko, db) {
    'use strict';
    var me = {
        authors: ko.observableArray([]),
        books: ko.observableArray([]),

        setExpandedAuthors: setExpandedAuthors
    };

    function setExpandedAuthors(author) {
        var existedState = author.IsExpanded();
        author.IsExpanded(!existedState);
    }

    function _init() {
        db.getAuthors(function (data) {
            var tempAuthors = [];
            ko.utils.arrayForEach(data || [], function (item) {
                tempAuthors.push(new app.Author(item.Id, item.FirstName, item.LastName));
            });
            me.authors(tempAuthors);
        });
        db.getBooks(function (data) {
            var tempBooks = [];
            ko.utils.arrayForEach(data || [], function (item) {

                var newBook = new app.Book(item.ISBN, item.Title, item.AmountOfPages, item.Rate, item.Date, item.Authors);
                newBook.UnchangedBook = ko.toJS(newBook);
                newBook.Title.subscribe(function (v) { newBook.trackBookChanges(); });
                tempBooks.push(newBook);

                if ($.isArray(newBook.Authors()) && $.isArray(me.authors())) {
                    ko.utils.arrayForEach(me.authors() || [], function (author) {
                        ko.utils.arrayForEach(newBook.Authors() || [], function (element) {
                            if (element === author.Id()) {
                                author.BooksCatalog.push(newBook);
                            }
                        });
                    });
                }
            });
            me.books(tempBooks);
        });

    }

    _init();
    return me;
}(ko, app.DataContext));