var Marionette = require('backbone.marionette'),
    ContactsView = require('./views/contacts'),
    ContactDetailsView = require('./views/contact_details'),
    AddContactView = require('./views/add'),
    GDFilesView = require('./views/gdfiles_list'),
    TimelineCanvasView = require('./views/timeline_canvas');


var Controller = Marionette.Controller.extend({
    initialize: function() {
        App.core.vent.trigger('app:log', 'Controller: Initializing');
        window.App.views.contactsView = new ContactsView({ collection: window.App.data.contacts });
        window.App.views.gdfilesView = new GDFilesView( { collection: window.App.data.gdfiles });
        //window.App.views.timelineCanvasView = new TimelineCanvasView( { collection: window.App.data.gdfiles });
    },

/*    home: function() {
        App.core.vent.trigger('app:log', 'Controller: "Home" route hit.');
        var view = window.App.views.contactsView;
        this.renderView(view);
        window.App.router.navigate('#');
    },*/

    timeline: function() {
        App.core.vent.trigger('app:log', 'Controller: "timeline" route hit.');
        var view = window.App.views.timelineCanvasView;
        this.renderView(view);
        window.App.router.navigate('#');
    },

    list: function() {
        App.core.vent.trigger('app:log', 'Controller: "list" route hit.');
        var view = window.App.views.gdfilesView;
        this.renderView(view);
        window.App.router.navigate('#');
    },

    details: function(id) {
        App.core.vent.trigger('app:log', 'Controller: "Contact Details" route hit.');
        var view = new ContactDetailsView({ model: window.App.data.contacts.get(id)});
        this.renderView(view);
        window.App.router.navigate('details/' + id);
    },

    add: function() {
        App.core.vent.trigger('app:log', 'Controller: "Add Contact" route hit.');
        var view = new AddContactView();
        this.renderView(view);
        window.App.router.navigate('add');
    },

    renderView: function(view) {
        this.destroyCurrentView(view);
        App.core.vent.trigger('app:log', 'Controller: Rendering new view.');
        $('#js-boilerplate-app').html(view.render().el);
    },

    destroyCurrentView: function(view) {
        if (!_.isUndefined(window.App.views.currentView)) {
            App.core.vent.trigger('app:log', 'Controller: Destroying existing view.');
            window.App.views.currentView.close();
        }
        window.App.views.currentView = view;
    }
});

module.exports = Controller;