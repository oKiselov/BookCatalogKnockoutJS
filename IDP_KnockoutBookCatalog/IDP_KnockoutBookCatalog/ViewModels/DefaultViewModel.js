var app = window.app || {};
app.DefaultViewModel = (function (ko, db) {
    'use strict';
    var me = {
        authors: ko.observableArray([]),
        books: ko.observableArray([]),

        setExpandedAuthors: setExpandedAuthors,
        saveBooks: saveBooks,
        saveAuthor: saveAuthor
    };

    function setExpandedAuthors(author) {
        var existedState = author.IsExpanded();
        author.IsExpanded(!existedState);
    }

    function saveBooks(item) {
        var items = [];
        if (!$.isArray(item)) {
            items.push(item);
        }
        else {
            items = item;
        }
        db.saveBooks(ko.toJS(items));
        alert("Refresh the page if you want to see saved books");
    }

    function saveAuthor(item) {
        db.saveAuthor(ko.toJS(item));
        alert("Refresh the page if you want to see saved author");
    }

    function setBookSubscription(booksArray) {
        ko.utils.arrayForEach(booksArray || [], function (item) {
            item.UnchangedBook = ko.toJS(item);
            item.Title.subscribe(function (v) { item.trackBookChanges(); });
            item.AmountOfPages.subscribe(function (v) { item.trackBookChanges(); });
            item.Date.subscribe(function (v) { item.trackBookChanges(); });
            item.Rate.subscribe(function (v) { item.trackBookChanges(); });
        });
    }

    function setAuthorSubscription(authorsArray) {
        ko.utils.arrayForEach(authorsArray || [], function (item) {
            item.UnchangedAuthor = ko.toJS(item);
            item.FirstName.subscribe(function (v) { item.trackAuthorChanges(); });
            item.LastName.subscribe(function (v) { item.trackAuthorChanges(); });
        });
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
        setBookSubscription(me.books());
        setAuthorSubscription(me.authors());
    }

    _init();
    return me;
}(ko, app.DataContext));