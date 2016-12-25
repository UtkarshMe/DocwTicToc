var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var gameSchema = mongoose.Schema({

    local:
    {
        email: String,
        password: String,
        name: String,
        level: Number
    }

});


userSchema.methods.correctAnswer = function (answer) {
    // take level and answer and compare
    //return bcrypt.compareSync(password, this.local.password);
}


module.exports = mongoose.model('Game', gameSchema);
