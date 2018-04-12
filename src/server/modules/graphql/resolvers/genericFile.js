var mongoose = mongo;
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
                    GenericFile.find({uploader: info.Username, userRelativePath:'/'+args.path}).then((files)=>{
                        resolve(files);
                    })
                }
                catch (e) {
                    reject(e);
                }
            });
        },
        folders: async function (parent, args, {GenericFile}){
            // TODO: make folders seperate??? Or just have them in the same database??
            return await new Promise((resolve,reject)=>{

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
                fs.mkdirSync(usersPath+info.Username+'/'+args.path);
                resolve(true);
            }
            catch (e) {
                throw (e);
                resolve(false);
                return;
            }
        },
        remove: async function (parent, args, {GenericFile}){
            try{
                var info = jwt.verify(args.token,secret);
                var p = usersPath + args.path;
                var stats = fs.statSync(p);
                if(stats.isDirectory()){
                    fs.rmdirSync(p);
                }
                else if(stats.isFile()){
                    fs.unlinkSync(p);
                }
                resolve(true);
            }
            catch(e){
                resolve(false);
            }
        }
    }
}

module.exports = resolvers;