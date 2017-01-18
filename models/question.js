var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({

    updated: { type: Date, default: Date.now },
    team: String,
    content: String

});

module.exports = mongoose.model('Question', questionSchema);
