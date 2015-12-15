var Backbone = require('backbone'),
    GDFileModel = require('../models/gdfile');

module.exports = GDFilesCollection = Backbone.Collection.extend({
    model:  GDFileModel,
    url: '/api/gdfiles'
});
