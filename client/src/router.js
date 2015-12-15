var Marionette = require('backbone.marionette');

module.exports = Router = Marionette.AppRouter.extend({
    appRoutes: {
        ''  : 'timeline',
        'list' : 'list',
        'details/:id' : 'details',
        'add' : 'add'
    }
});
