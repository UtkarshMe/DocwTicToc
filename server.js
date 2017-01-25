// Require all packages
var express = require('express');
var fs = require('fs');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var morgan = require('morgan');
var session = require('express-session');

// Required by redshift
var path = require('path');
var contentTypes = require('./utils/content-types');
var sysInfo = require('./utils/sys-info');
var env = process.env;

// Read config file
var config = JSON.parse(fs.readFileSync('./config/config.json'));

// Create and setup app
var app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Use ejs as the view engine
app.use(session(
    {
        secret: 'huehuehue',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: true
        }
    })
);


//Use morgan for logging
app.use(morgan('tiny'));


// Connect database
var mongoose = require('mongoose');
//Use global promise for mongoose
mongoose.Promise = global.Promise;

if (env.OPENSHIFT_MONGODB_DB_HOST) {
    // For use on openshift
    mongoose.connect("mongodb://"+config.db.username+":"+config.db.password+"@"+
        env.OPENSHIFT_MONGODB_DB_HOST || config.db.host +":"+
        env.OPENSHIFT_MONGODB_DB_PORT || config.db.port +"/"+config.db.database);

} else {
    // For use locally
    mongoose.connect("mongodb://"+config.db.host+":"+config.db.port+"/database");
}


// Use passport as middleware for authentication
app.use(passport.initialize());
app.use(passport.session());
//Configure passport
require('./config/passport.js')(passport);


// Use a routing file for route management
require('./routes.js')(app, passport);

// Use a routing file for API management
require('./api.js')(app, passport);


// Use public directory for static files
app.use(express.static(__dirname + '/public'));
app.get('*', function (req, res) {
    res.redirect('/404');
});


// Listen to app
app.listen(env.NODE_PORT || config.port, env.NODE_IP || config.host);
console.log('Listening on', config.host + ':' + config.port);
