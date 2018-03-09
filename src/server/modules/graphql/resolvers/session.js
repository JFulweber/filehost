var mongoose = mongo;
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');
var secret = 'hellohellohellobigpenor'
var hasher = require('../../hasher');
var verify = hasher.verify;

var resolvers = {
    Query: {
        authenticate: async function (parent, args, { Session }) {

            return await new Promise((resolve, reject) => {
                try {
                    var decoded = jwt.verify(args.token, secret);
                    if (decoded.username == 'undefined') {
                        resolve(false);
                    }
                    resolve(true);
                } catch (e) {
                    resolve(false);
                }
            })
        }
    },
    Mutation: {
        createSession: async function (parent, args, {
            User,
            Session
        }) {
            return await new Promise((resolve, reject) => {
                User.findOne({ username: args.username})
                    .then(user => {
                        var verifyRes = verify(args.pass, user.hashedPass);
                        if (user == null) {
                            resolve(null);
                            return;
                        }
                        if(verifyRes===true){
                            var token = jwt.sign({
                                Username: args.username
                            }, secret, {
                                    expiresIn: '1h'
                                });
                            var NewSession = new Session({
                                Username: args.username,
                                Token: token
                            });
                            if (token && args.username != "undefined") {
                                resolve(NewSession);
                            }
                        }
                        else{
                            resolve(null);
                        }
                    })
            })
        }
    }
}

module.exports = resolvers;