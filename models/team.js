var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var teamSchema = mongoose.Schema({

    local:
    {
        username: String,
        password: String,
        members:[
        {
            name: String,
            id: String,
        }],
        game:
        {
            level: Number,
            time_left: Number,
            time_elapsed: Number,
            score: Number
        }

    }

});


teamSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}


teamSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
}


module.exports = mongoose.model('Team', teamSchema);
