var mongoose = require('mongoose');

var newsSchema = mongoose.Schema({

    updated: { type: Date, default: Date.now },
    title: String,
    content: String,
    level: Number,

});

newsSchema.methods.getUnreadNumber = function (readDate) {
    return this.model('News').find({ updated : { $lt: readDate } }).length;
}


module.exports = mongoose.model('News', newsSchema);
