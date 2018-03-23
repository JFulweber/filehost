var mongoose = mongo;
var fs = require('fs');
var jwt = require('jsonwebtoken');
var secret = 'hellohellohellobigpenor';
var _path = require('path')
// TODO: make secret file
var resolvers = {
    Query: {
        files: async function (parent, args, { GenericFile }) {
            // given args.path, find all top level files and return array of paths
            //TODO: make this a promise
            return await new Promise((resolve, reject) => {
                try {
                    var info = jwt.verify(args.token, secret);
                    console.log(info);
                    // goes from this files directory to the root of the workspace directory
                    var gpath = _path.resolve(__dirname + "../../../../../../users/" + info.Username + '/' + args.path);
                    fs.readdir(gpath, (err, files) => {
                        var editedFiles = [];
                        if(files==undefined){
                            console.log(gpath);
                            return;
                        }
                        files.forEach((file) => {
                            var path = gpath+'/'+file;
                            var fileStats = fs.statSync(path);
                            if(fileStats.isDirectory()){
                                editedFiles.push({
                                    path: path,
                                    type: "dir",
                                    size: 0
                                })
                            }else{
                                editedFiles.push({
                                    path: path,
                                    type: file.substring(file.lastIndexOf('.')) != file ? file.substring(file.lastIndexOf('.')) : "typeless",
                                    size: fileStats.size
                                })
                            }
                        })
                        resolve(editedFiles);
                    });
                }
                catch (e) {
                    console.log(e);
                    reject(e);
                }
            });
        },
        file: async function (parent, args, { GenericFile }) {

            return {};
        }
    },
    Mutation: {
        addFile: async function (parent, args, { GenericFile }) {
            /* yes */
            return true;
        }
    }
}

module.exports = resolvers;