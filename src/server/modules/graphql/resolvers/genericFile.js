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
                    GenericFile.find({ uploader: info.Username, userRelativePath: args.path == '' ? '/' : args.path }).then((files) => {
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
            return await new Promise((resolve, reject) => {
                try {
                    var info = jwt.verify(args.token, secret);
                    var folder = new GenericFile({
                        absolutePath: null,
                        userRelativePath: args.path == 'undefined' ? '/' : args.path,
                        name: args.name,
                        uploader: info.Username,
                        type: "dir"
                    })
                    folder.save().then((e) => { console.log(e); resolve(true) }).catch((e) => resolve(false));
                }
                catch (e) {
                    throw (e);
                    resolve(false);
                    return;
                }
            });
        },
        remove: async function (parent, args, { GenericFile }) {
            console.log('getting remove??');
            return await new Promise((resolve, reject) => {
                try {
                    var info = jwt.verify(args.token, secret);
                    if (args.path == 'undefined') args.path = '';
                    GenericFile.find({ userRelativePath: args.path === '' ? '/' : args.path, name: args.name }).then((res) => {
                        res.forEach(element => {
                            if (element.type == 'dir') {
                                console.log('yes element is dir');
                                GenericFile.find({ userRelativePath: new RegExp(`/^\/${element.userRelativePath}\/${element.name}\//`,'i')}).then((containedFiles) => {
                                    if (containedFiles == undefined) {
                                        element.remove().then(() => resolve(true));
                                    }
                                    console.log(containedFiles);
                                    console.log('this is contained');
                                    containedFiles.forEach(contained => {
                                        fs.unlinkSync(_path.resolve(__dirname + `../../../../../../users/${contained.uploader}/${contained.name}`));
                                        contained.remove();
                                    })
                                    element.remove().then(()=>resolve(true));
                                })
                                //element.remove();
                            }
                            else {
                                try {
                                    fs.unlinkSync(_path.resolve(__dirname + `../../../../../../users/${element.uploader}/${element.path === undefined ? '/' : element.path}/${element.name}`));
                                    element.remove().then(() => resolve(true));
                                }
                                catch(e){
                                    if(e.code=='ENOENT'){
                                        element.remove().then(()=>resolve(true));
                                    }
                                    else resolve(false);
                                }
                            }
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