var fs = require("fs");

// Using winston for logging
var winston = require("winston");
var log = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: "info-file",
            filename: "./logs/server_info.log",
            level: "info"
        }),
        new (winston.transports.File)({
            name: "error-file",
            filename: "./logs/server_error.log",
            level: "error"
        })
    ]
});


// Read config file
var config = JSON.parse(fs.readFileSync("./config.json"));

// Create app
var express = require("express");
var app = express();

// Listen to app
app.listen(config.port, config.host);
log.info("Listening on", config.host + ":" + config.port);
