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
                    // TODO: fix this
                    userargs.hashedPass = require('../../hasher')(args.hashedPass);
                    var myUser = new User(userargs);
                    myUser.save().then(()=>{
                        console.log('saved');
                        console.log(myUser);
                        resolve(true)
                    }).catch((err)=>{
                        console.log('not saved');
                        reject(err);
                    })
                }).catch((err)=>{
                    console.log('err below')
                    console.log(err);
                    reject(err);
                })
            });
        }
    }
}

module.exports = resolvers;