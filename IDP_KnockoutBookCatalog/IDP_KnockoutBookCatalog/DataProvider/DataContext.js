var app = window.app || {};
app.DataContext = (function () {
    'use strict';
    var me = {
        getBooks: getBooks,
        saveBooks: saveBooks,
        getAuthors: getAuthors,
        saveAuthors: saveAuthors
    };

    var booksCatalog = "booksCatalog";
    var authorsCatalog = "authorsCatalog";

    function getCatalogFromStorage(callback, localStorageId, path) {
        var catalog = null;
        if ($.isFunction(callback)) {
            catalog = localStorage[localStorageId];
            if (catalog) {
                callback(JSON.parse(catalog));
            } else {
                $.getJSON(path, function (data) {
                    localStorage[localStorageId] = JSON.stringify(data.Catalog);
                    callback(data.Catalog);
                });
            }
        }
    }

    function getBooks(callback) {
        getCatalogFromStorage(callback, booksCatalog, '../Data/Books.json');
    }

    function getAuthors(callback) {
        getCatalogFromStorage(callback, authorsCatalog, '../Data/Authors.json');
    }

    function saveAuthors(authorsArray) {
    }

    function saveBooks(booksArray) {
        var catalog = localStorage[booksCatalog],
            updatedData = [],
            exists = false,
            i = 0,
            l = 0;
        if (catalog) {
            updatedData = JSON.parse(catalog);
            if ($.isArray(updatedData) && $.isArray(booksArray)) {
                $.each(booksArray, function (index, item) {
                    for (i = 0; i < updatedData.length; i++) {
                        if (updatedData[i].ISBN === item.ISBN) {
                            exists = true;
                            break;
                        }
                        if (!exists) {
                            updatedData.push(item);
                        } else if (exists) {
                            updatedData[i].Title = item.Title;
                            updatedData[i].AmountOfPages = item.AmountOfPages;
                            updatedData[i].Rate = item.Rate;
                            updatedData[i].Date = item.Date;
                            updatedData[i].Authors = item.Authors.join();
                        }
                    }
                });
                localStorage[booksCatalog] = JSON.stringify(updatedData);
            }
        }
    }

    return me;
}(jQuery));