var {Schema} = require('mongoose');
var ttl = require('mongoose-ttl');

let Session = new Schema({
    User_ID: !String,
    Token: !String
})

session.plugin(ttl, {ttl: '2d'});

module.exports = mongoose.model('Session', session);