var { Schema } = require('mongoose');

let User = new Schema({
    username: !String,
    email: !String,
    hashedPass: !String,
    creationDate: !Date,
    approved: {
        type: !Boolean, default: false
    }
})

module.exports = mongo.model('User', User);