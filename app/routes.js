var home = require('../controllers/home'),
    contacts = require('../controllers/contacts'),
    gdfiles = require('../controllers/gdfiles');

module.exports.initialize = function(app) {
    app.get('/', home.index);
    app.get('/api/contacts', contacts.index);
    app.get('/api/contacts/:id', contacts.getById);
    app.post('/api/contacts', contacts.add);
    // app.put('/api/contacts', contacts.update);
    app.delete('/api/contacts/:id', contacts.delete);

    app.get('/api/gdfiles/thumbnail/:id/:width/:height', gdfiles.thumbnail);
    app.get('/api/gdfiles', gdfiles.index);

};
