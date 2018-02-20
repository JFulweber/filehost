var mongoose = mongo;
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');

var resolvers = {
    Query: {
        authenticate: async function(parent, args, {User}){
            return true;
        }
    },
    Mutation: {
        createSession: async function (parent, args, {
            User,
            Session
        }) {
            console.log('hello');
            return await new Promise((resolve, reject) => {
                var DeletedSession = Session.find({
                    username: args.username
                }).then((res) => {
                    res.forEach((session) => {
                        session.remove();
                    })
                });
                DeletedSession.then(() => {
                    var token = jwt.sign({
                        Username: args.username
                    }, 'thisisnotmyrealsecretdontworryaboutit', {
                        expiresIn: "2d"
                    });
                    var NewSession = new Session({
                        Username: args.username,
                        Token: token
                    });
                    NewSession.save().then((ans) => {
                        resolve(ans);
                    }).catch((e) => {
                        reject(e);
                    }) 
                });
            })
        }
    }
}

module.exports = resolvers;