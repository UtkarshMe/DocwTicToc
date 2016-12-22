var fs = require("fs");

// Read config file
var config = JSON.parse(fs.readFileSync("./config.json"));

// Using winston for logging
var winston = require("winston");
var log = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
            filename: config.log.file,
            level: config.log.level.file
        })
    ]
});
// Set logging level for console
log.level = config.log.level.console;

// Create app
var express = require("express");
var app = express();

// Use public directory for static files
app.use(express.static(__dirname + "/public"));


// Listen to app
app.listen(config.port, config.host);
log.info("Listening on", config.host + ":" + config.port);
