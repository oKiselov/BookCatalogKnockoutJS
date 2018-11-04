var app = window.app || {};
app.DataContext = (function () {
    'use strict';
    var me = {
        getBooks: getBooks,
        saveBooks: saveBooks,
        getAuthors: getAuthors,
        saveAuthor: saveAuthor
    };

    var booksCatalog = "booksCatalog";
    var authorsCatalog = "authorsCatalog";

    function getBooks(callback) {
        getCatalogFromStorage(callback, booksCatalog, '../Data/Books.json');
    }

    function getAuthors(callback) {
        getCatalogFromStorage(callback, authorsCatalog, '../Data/Authors.json');
    }


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

    function saveAuthor(author) {
        var catalog = localStorage[authorsCatalog],
            existedData = [],
            exists = false,
            i = 0;
        if (catalog) {
            existedData = JSON.parse(catalog);
            if ($.isArray(existedData)) {
                for (i = 0; i < existedData.length; i++) {
                    if (existedData[i].Id === author.Id) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    existedData.push(author);
                } else if (exists) {
                    existedData[i].FirstName = author.FirstName;
                    existedData[i].LastName = author.LastName;
                }
            }
            localStorage[authorsCatalog] = JSON.stringify(existedData);
        }
    }

    function saveBooks(booksArray) {
        var catalog = localStorage[booksCatalog],
            existedData = [],
            exists = false,
            i = 0;
        if (catalog) {
            existedData = JSON.parse(catalog);
            if ($.isArray(existedData) && $.isArray(booksArray)) {
                $.each(booksArray, function (index, item) {
                    for (i = 0; i < existedData.length; i++) {
                        if (existedData[i].ISBN === item.ISBN) {
                            exists = true;
                            break;
                        }
                    }
                    if (!exists) {
                        existedData.push(item);
                    } else if (exists) {
                        existedData[i].Title = item.Title;
                        existedData[i].AmountOfPages = item.AmountOfPages;
                        existedData[i].Rate = item.Rate;
                        existedData[i].Date = item.Date;
                        existedData[i].Authors = item.Authors;
                    }
                });
                localStorage[booksCatalog] = JSON.stringify(existedData);
            }
        }
    }

    return me;
}(jQuery));