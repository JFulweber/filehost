var mongoose = require('../../mongo/mongohandle')

var resolvers = {
    Query: {
        users: async function (parent, args, { User }) {
           /*  console.log('resolving')
            return await new Promise((resolve, reject) => {
                User.find({}).then(results => {
                    resolve(results);
                });
            }); */
            return {};
        },
        user: async function (parent, args, { User }) {
            /* return await new Promise((resolve, reject) => {
                User.findOne({ username: args.username }).then(result => {
                    resolve(result);
                });
            }) */
            return {};
        }
    },
    Mutation: {
        addUser: async function (parent, args, { User}) {
           /*  return await new Promise((resolve, reject) => {
                args.new_user.joined = Date.now();
                var myUser = new User(args.new_user);
                var myLogin = new Login(args.new_user);
                myLogin.save()
                myUser.save().then(() => {
                    resolve(true);
                });
            }); */
            return true;
        }
    }
}

module.exports = resolvers;