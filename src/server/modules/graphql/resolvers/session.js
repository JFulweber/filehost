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
                    resolve(true);
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
                var token = jwt.sign({
                    Username: args.username
                }, secret, {
                    expiresIn: '1m'
                });
                var NewSession = new Session({
                    Username: args.username,
                    Token: token
                });
                if(token)
                {
                    resolve(NewSession);
                }
                else reject("no token idk");
                /* var DeletedSession = Session.find({
                    username: args.username
                }).then((res) => {
                    res.forEach((session) => {
                        session.remove();
                    })
                });
                DeletedSession.then(() => {
                    
                    
                    NewSession.save().then((ans) => {
                        resolve(ans);
                    }).catch((e) => {
                        reject(e);
                    }) 
                }); */
            })
        }
    }
}

module.exports = resolvers;