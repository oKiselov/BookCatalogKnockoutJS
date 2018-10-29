var app = window.app || {};
app.TemplateViewModel = (function ($) {
    'use strict';
    var template = 'book_template';

    var me = {
        loadTemplates: loadTemplates
    };

    function loadTemplates(callback) {
        $.get('/Templates/' + template + '.html', null, function (content) {
            $('body').append(content);
            if ($.isFunction(callback)) {
                callback();
            }
        });
    }
    return me;
}(jQuery));