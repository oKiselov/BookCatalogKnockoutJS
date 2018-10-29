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
                tempBooks.push(new app.Book(item.ISBN, item.Title, item.Pages, item.Date, item.Authors));
                var arrayAuthors = item.Authors.split(',').map(Number);
                if ($.isArray(arrayAuthors) && $.isArray(me.authors())) {
                    ko.utils.arrayForEach(me.authors() || [], function (author) {
                        ko.utils.arrayForEach(arrayAuthors || [], function (element) {
                            if (element.Id === author.Id) {
                                author.BooksCatalog.push(new app.Book(item.ISBN, item.Title, item.Pages, item.Date));
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