var password = require('password-hash');
var Promise = require('bluebird');
var secret = "whatever bro";

function passwordHasher(pass){
    return{
        generate: function(){
            return password.generate(pass,{
                algorithm: "sha256",
                saltLength: 32,
                iterations: 5
            });
        },
        verify: function(givenPass,hash){
            return password.verify(givenPass,hash)
        }
    }
}

module.exports = passwordHasher;