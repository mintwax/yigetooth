/*jslint node: true */
'use strict';

var Backbone = require('backbone');
var ContactModel;

module.exports = ContactModel = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: 'api/contacts'
});
