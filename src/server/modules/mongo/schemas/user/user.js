var mongoose = require('mongoose');
var {Schema} = mongoose;

let User = new Schema({
    username: !String,
    email: !String,
    hashedPass: !String,
    creationDate: !Date
})

module.exports = mongoose.model('User',User);