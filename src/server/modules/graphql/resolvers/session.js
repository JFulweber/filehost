var mongoose = mongo;
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');
var secret = 'hellohellohellobigpenor'

var resolvers = {
    Query: {
        authenticate: async function(parent, args, {Session}){
            
            return await new Promise((resolve,reject)=>{
                // is a mongo backend necessary for jwt? can we not just check the authetnication and verify the sig of the jwt?
                // TODO: look into that
                try{
                    var decoded = jwt.verify(args.token,secret);
                    if(Date.now()>=decoded.exp+1000*60*60*24*2){
                        resolve(false);
                    }
                    else{
                        resolve(true);
                    }
                }catch(e){
                    resolve(false);
                }
                //console.log(decoded);
                
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
                    }, secret, {
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