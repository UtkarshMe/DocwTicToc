var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var teamSchema = mongoose.Schema({

    local:
    {
        username: String,
        password: String,
        level: Number
    }

});


teamSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}


teamSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
}


module.exports = mongoose.model('Team', teamSchema);
