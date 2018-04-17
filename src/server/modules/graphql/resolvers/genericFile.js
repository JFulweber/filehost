var { Query } = require('mongoose');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var secret = require('../../../secret');
var _path = require('path')
var usersPath = __dirname + "../../../../../../users/";
// TODO: make secret file
var resolvers = {
    Query: {
        files: async function (parent, args, { GenericFile }) {
            // given args.path, find all top level files and return array of paths
            //TODO: make this a promise
            return await new Promise((resolve, reject) => {
                var info;
                try {
                    info = jwt.verify(args.token, secret);
                    // goes from this files directory to the root of the workspace directory
                    //var gpath = _path.resolve(usersPath + info.Username + '/' + args.path);
                    GenericFile.find({ uploader: info.Username, userRelativePath: '/' + args.path }).then((files) => {
                        resolve(files);
                    })
                }
                catch (e) {
                    reject(e);
                }
            });
        },
        folders: async function (parent, args, { GenericFile }) {
            // TODO: make folders seperate??? Or just have them in the same database??
            return await new Promise((resolve, reject) => {

            })
        },
        file: async function (parent, args, { GenericFile }) {

            return {};
        }
    },
    Mutation: {
        addFile: async function (parent, args, { GenericFile }) {
            /* yes */
            return true;
        },
        addFolder: async function (parent, args, { GenericFile }) {
            // path is in terms from user root directory
            try {
                var info = jwt.verify(args.token, secret);
                var folder = new GenericFile({
                    absolutePath: null,
                    userRelativePath: args.path,
                    name: args.name,
                    uploader: info.Username,
                    type: "dir"
                })
                folder.save().then(() => resolve(true)).catch((e) => resolve(false));
            }
            catch (e) {
                throw (e);
                resolve(false);
                return;
            }
        },
        remove: async function (parent, args, { GenericFile }) {
            return await new Promise((resolve, reject) => {
                try {
                    var info = jwt.verify(args.token, secret);
                    GenericFile.find({ userRelativePath: args.path === '' ? '/' : args.path, name: args.name }).then((res) => {
                        res.forEach(element => {
                            fs.unlinkSync(_path.resolve(__dirname+`../../../../../../users/${element.uploader}/${element.path===undefined?'/':element.path}/${element.name}`));
                            element.remove().then(() => resolve(true));
                        });
                    })
                }
                catch (e) {
                    throw (e);
                    resolve(false);
                }
            })
        }
    }
}

module.exports = resolvers;