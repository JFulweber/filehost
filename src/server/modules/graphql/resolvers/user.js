var mongoose = mongo;
var hasher = require('../../hasher')

var resolvers = {
    Query: {
        users: async function (parent, args, {User}){
            return await new Promise((resolve,reject)=>{
                User.find({}).then(res=>{
                    resolve(res);
                })
            })
        },
        user: async function (parent, args, {
            User
        }) {
            return await new Promise((resolve, reject) => {
                User.findOne({ username: args.UserID }).then(result => {
                    resolve(result);
                }).catch((err)=>{
                    reject(err);
                });
            }) 
        }
    },
    Mutation: {
        register: async function (parent, args, {User}) {
            return await new Promise((resolve, reject) => {
                User.findOne({ email: args.email }).then((user)=>{
                    if(user){
                        resolve(false);
                        return;
                    }
                    var userargs = args;
                    userargs.creationDate = Date.now();
                    userargs.hashedPass = hasher.generate(args.password);
                    var myUser = new User(userargs);
                    myUser.save().then(()=>{
                        resolve(true)
                    }).catch((err)=>{
                        reject(err);
                    })
                }).catch((err)=>{
                    reject(err);
                })
            });
        }
    }
}

module.exports = resolvers;