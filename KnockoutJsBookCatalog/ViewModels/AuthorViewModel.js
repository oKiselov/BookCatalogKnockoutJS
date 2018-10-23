var app = window.app || {};
app.Author = function (id, firstName, lastName, books) {
    'use strict';
    this.Id = ko.observable(id);
    this.FirstName = ko.observable(firstName);
    this.LastName = ko.observable(lastName);
    this.Books = ko.observableArray(books ? books : undefined);
};