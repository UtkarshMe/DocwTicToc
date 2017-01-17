var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var teamSchema = mongoose.Schema({

    local:
    {
        username: { type: String, lowercase: true },
        password: String,
        member: [ String ],
        phone: String,
        game:
        {
            level: { type: Number, default: 1 },
            time_left: { type: Number, default: 200 },
            time_elapsed: Number,
            score: { type: Number, default: 0 }
        },
        status: { type: Number, default: 0 },
        last_read_news: { type: Date, default: Date.now }
    }

});


teamSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}


teamSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
}


module.exports = mongoose.model('Team', teamSchema);
