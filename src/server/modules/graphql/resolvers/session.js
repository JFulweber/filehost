var mongoose = mongo;
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');
function TokenGenerator() {

}

var resolvers = {
    Query: {},
    Mutation: {
        createSession: async function (parent, args, {
            User,
            Session
        }) {
            return await new Promise((resolve, reject) => {
                var DeletedSession = Session.find({
                    UserID: args.UserID
                }).then((res) => {
                    res.forEach((session) => {
                        session.remove();
                    })
                });
                DeletedSession.then(() => {
                    var token = jwt.sign({
                        UserID: args.UserID
                    }, 'thisisnotmyrealsecretdontworryaboutit', {
                        expiresIn: "2d"
                    });
                    var NewSession = new Session({
                        UserID: args.UserID,
                        Token: token
                    });
                    NewSession.save().then((ans) => {
                        resolve(token);
                    }).catch((e) => {
                        reject(e);
                    })
                    
                });
            })
        }
    }
}

module.exports = resolvers;