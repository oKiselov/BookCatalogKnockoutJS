var app = window.app || {};
app.DataContext = (function () {
    'use strict';
    var me = {
        getBooks: getBooks,
        saveBooks: saveBooks
    };

    var booksCatalog = "booksCatalog";

    function getBooks(callback) {
        var catalog = null;
        if ($.isFunction(callback)) {
            catalog = localStorage[booksCatalog];
            if (catalog) {
                callback(JSON.parse(catalog));
            } else {
                $.getJSON('../DataStorage/Books.json', function (data) {
                    localStorage[booksCatalog] = JSON.stringify(data.Catalog);
                    callback(data.Catalog);
                });
            }
        }
    }

    function saveBooks(booksArray) {
        var catalog = localStorage[booksCatalog],
            updatedData = [],
            exists = false,
            i = 0,
            l = 0;
        if (catalog) {
            updatedData = JSON.parse(catalog);
            if ($.isArray(updatedData)) {
                $.each(booksArray, function (index, item) {
                    for (i = 0, l = data.length; i < l; i++) {
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