// Require all packages
var express = require('express');
var fs = require('fs');
var winston = require('winston');
var expressWinston = require('express-winston');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


// Read config file
var config = JSON.parse(fs.readFileSync('./config/config.json'));


// Create app
var app = express();


// Using winston for logging
var log = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            level: config.log.level.console
        }),
        new (winston.transports.File)({
            filename: config.log.file,
            level: config.log.level.file
        })
    ]
});
// Use winston for logs by express
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            colorize: true,
            level: "verbose"
        })
    ]
}));


// Connect database
var mongoose = require('mongoose');
mongoose.connect(config.db.url);


// Use passport as middleware for authentication
app.use(passport.initialize());
app.use(passport.session());
//Configure passport
require('./config/passport.js')(passport);


// Use a routing file for route management
require('./routes.js')(app, passport);

// Use public directory for static files
app.use(express.static(__dirname + '/public'));


// Listen to app
app.listen(config.port, config.host);
log.info('Listening on', config.host + ':' + config.port);
