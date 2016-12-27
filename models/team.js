var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var teamSchema = mongoose.Schema({

    local:
    {
        username: String,
        password: String,
        member: [ String ],
        phone: String,
        game:
        {
            level: { type: Number, default: 1 },
            time_left: Number,
            time_elapsed: Number,
            score: { type: Number, default: 0 }
        },
        status: { type: Number, default: 0 }

    }

});


teamSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}


teamSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
}


module.exports = mongoose.model('Team', teamSchema);
