var mongoose = mongo;
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');
var secret = 'hellohellohellobigpenor'
var hasher = require('../../hasher')
var resolvers = {
    Query: {
        authenticate: async function (parent, args, { Session }) {

            return await new Promise((resolve, reject) => {
                // is a mongo backend necessary for jwt? can we not just check the authetnication and verify the sig of the jwt?
                // TODO: look into that
                try {
                    var decoded = jwt.verify(args.token, secret);
                    if (decoded.username == 'undefined') {
                        resolve(false);
                    }
                    resolve(true);
                } catch (e) {
                    resolve(false);
                }
                //console.log(decoded);

                Session.findOne({ Token: args.token, Username: args.username }, function (err, result) {
                    if (!result) resolve(false);
                    resolve(true);
                });
            })
        }
    },
    Mutation: {
        createSession: async function (parent, args, {
            User,
            Session
        }) {
            return await new Promise((resolve, reject) => {
                /* YESSIR */
                User.findOne({ username: args.username, hashedPass: hasher(args.pass) })
                    .then(user => {
                        if (user == null) {
                            resolve(null);
                            return;
                        }
                        console.log(user);
                        var token = jwt.sign({
                            Username: args.username
                        }, secret, {
                                expiresIn: '1m'
                            });
                        var NewSession = new Session({
                            Username: args.username,
                            Token: token
                        });
                        if (token && args.username != "undefined") {
                            resolve(NewSession);
                        }
                    })
            })
        }
    }
}

module.exports = resolvers;