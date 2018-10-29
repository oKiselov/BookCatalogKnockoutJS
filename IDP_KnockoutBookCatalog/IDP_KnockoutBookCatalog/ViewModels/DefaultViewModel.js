var app = window.app || {};
app.DefaultViewModel = (function (ko, db) {
    'use strict';
    var me = {
        authors: ko.observableArray([])
    };

    function _init() {
        db.getAuthors(function (data) {
            var tempAuthors = [];
            ko.utils.arrayForEach(data || [], function (item) {
                tempAuthors.push(new app.Author(item.Id, item.FirstName, item.LastName));
            });
            me.authors(tempAuthors);
        });
    }

    _init();
    return me;
}(ko, app.DataContext));