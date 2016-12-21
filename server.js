var fs = require("fs");

// Read config file
var config = JSON.parse(fs.readFileSync("./config.json"));

// Create app
var express = require("express");
var app = express();

// Listen to app
app.listen(config.port, config.host);
