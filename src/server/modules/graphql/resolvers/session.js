var mongoose = mongo;
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');

var resolvers = {
    Query: {
        authenticate: async function(parent, args, {Session}){
            return await new Promise((resolve,reject)=>{
                // is a mongo backend necessary for jwt? can we not just check the authetnication and verify the sig of the jwt?
                // TODO: look into that
                Session.findOne({Token: args.token, Username: args.username}, function(err, result){
                    if(!result) resolve(false);
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
                    }, 'good lord that code doesn\'t like that at all', {
                        expiresIn: "2d"
                    });
                    var NewSession = new Session({
                        Username: args.username,
                        Token: token,
                        
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