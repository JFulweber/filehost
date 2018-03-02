var mongoose = mongo;

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
                console.log(args);
                User.findOne({ username: args.UserID }).then(result => {
                    console.log(result)
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
                    args.creationDate = Date.now();
                    args.hashedPass = require('../../hasher')(args.hashedPass);
                    var myUser = new User(args);
                    myUser.save().then(()=>{
                        console.log('saved');
                        resolve(true)
                    }).catch((err)=>{
                        console.log('not saved');
                        reject(err);
                    })
                }).catch((err)=>{
                    console.log(err);
                    reject(err);
                })
            });
        }
    }
}

module.exports = resolvers;