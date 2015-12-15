/*jslint node: true */
'use strict';

var Backbone = require('backbone');
var GDFileModel;

module.exports = GDFileModel = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: 'api/gdfiles'
});
