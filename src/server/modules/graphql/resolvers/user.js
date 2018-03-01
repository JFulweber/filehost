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
                User.findOne({ email: args.new_user.email }).then((user)=>{
                    if(user)
                        reject(false);
                    args.new_user.creationDate = Date.now();
                    args.new_user.hashedPass = require('../../hasher')(args.new_user.hashedPass);
                    var myUser = new User(args.new_user);
                    myUser.save().then(()=>{
                        resolve(true)
                    }).catch()
                }).catch((err)=>{
                    reject(false);
                })
            });
        }
    }
}

module.exports = resolvers;