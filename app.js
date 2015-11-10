/*jslint node: true */
'use strict';

var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),

    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),

    routes = require('./app/routes'),
    exphbs = require('express-handlebars'),
    mongoose = require('mongoose'),
    seeder = require('./app/seeder'),
    app = express();

/*
 * VIEW CONFIGURATION
 */
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts')
}));
app.set('view engine', 'handlebars');
app.set('title', 'The amazing yigetooth!');

/*
 * LOAD middleware
*/
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(methodOverride());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));

/*
 * connect to the db server:
 */
var MONGOLAB_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/yigetooth';

mongoose.connect(MONGOLAB_URI);
mongoose.connection.on('open', function() {
    console.log('Connected to Mongoose...');

    // check if the db is empty, if so seed it with some contacts:
    seeder.check();
});

/*
 * LOAD routes
*/
//routes list:
routes.initialize(app);

/*
 * ERROR HANDLING
 */

if ('development' == app.get('env')) {
    app.use(errorHandler());
}

module.exports = app;