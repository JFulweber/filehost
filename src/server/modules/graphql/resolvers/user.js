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
            reject(null);
            return await new Promise((resolve, reject) => {
                User.findOne({ username: args.username }).then(result => {
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
                console.log('running register');
                var res = User.findOne({ email: args.email }).then((user)=>{
                    console.log("yeah hello???");
                    if(user)
                        reject(false);
                    console.log(user);
                    args.creationDate = Date.now();
                    args.hashedPass = require('../../hasher')(args.hashedPass);
                    var myUser = new User(args);
                    myUser.save().then(()=>{
                        resolve(true)
                    }).catch(()=>{
                        reject(false);
                    })
                }).catch((err)=>{
                    console.log(err);
                    reject(false);
                })
                res.then((a)=>{
                    console.log(a);
                }).catch((e)=>{
                    console.log(e)
                })
                console.log('hello???');
            });
        }
    }
}

module.exports = resolvers;