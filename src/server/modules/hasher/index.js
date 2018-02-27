var password = require('password-hash-and-salt');
var secret = "whatever bro";

function passwordHasher(pass){
    password(pass).hash(function(err, hash){
        console.log(hash);
    })
}

module.exports = passwordHasher;