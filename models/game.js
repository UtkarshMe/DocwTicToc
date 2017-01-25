var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({

    local:
    {
        email: String,
        password: String,
        name: String,
        level: Number
    }

});

module.exports = mongoose.model('Game', gameSchema);
