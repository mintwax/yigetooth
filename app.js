var express = require('express'),
    path = require('path'),
    routes = require('./app/routes'),
    exphbs = require('express-handlebars'),
    mongoose = require('mongoose'),
    seeder = require('./app/seeder'),
    app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts')
}));
app.set('view engine', 'handlebars');
app.set('title', 'The amazing yigetooth!')

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('some-secret-value-here'));
app.use(app.router);
app.use('/', express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//connect to the db server:
/*mongoose.connect('mongodb://localhost/MyApp');
mongoose.connection.on('open', function() {
    console.log("Connected to Mongoose...");

    // check if the db is empty, if so seed it with some contacts:
    seeder.check();
});
*/

//routes list:
routes.initialize(app);

module.exports = app;