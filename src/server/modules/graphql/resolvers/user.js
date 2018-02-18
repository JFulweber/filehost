var mongoose = mongo;

var resolvers = {
    Query: {
        users: async function (parent, args, {
            User
        }) {
            /*  console.log('resolving')
             return await new Promise((resolve, reject) => {
                 User.find({}).then(results => {
                     resolve(results);
                 });
             }); */
            return {};
        },
        user: async function (parent, args, {
            User
        }) {
            /* return await new Promise((resolve, reject) => {
                User.findOne({ username: args.username }).then(result => {
                    resolve(result);
                });
            }) */
            return {};
        }
    },
    Mutation: {
        createUser: async function (parent, args, {User}) {
            return await new Promise((resolve, reject) => {
                User.findOne({ email: args.new_user.email }).then((user)=>{
                    reject(false);
                }).catch((err)=>{
                    args.new_user.creationDate = Date.now();
                    var myUser = new User(args.new_user);
                    myUser.save().then(()=>{
                        resolve(true)
                    })
                })
            });
        }
    }
}

module.exports = resolvers;