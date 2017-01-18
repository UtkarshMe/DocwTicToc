var mongoose = require('mongoose');

var newsSchema = mongoose.Schema({

    updated: { type: Date, default: Date.now },
    title: String,
    content: String,
    level: Number,

});

module.exports = mongoose.model('News', newsSchema);
