var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


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
            time: { type: Number, default: 0 },
            score: { type: Number, default: 0 },
            chances: { type: Number, default: 3 },
            lives: { type: Number, default: 5 }
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
