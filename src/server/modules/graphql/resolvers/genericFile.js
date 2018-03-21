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
            try {

                var info = jwt.verify(args.token, secret);
                console.log(info);
                // goes from this files directory to the root of the workspace directory
                var path = _path.resolve(__dirname+"../../../../../../users/" + info.Username+'/' + args.path);
                console.log(path);
                fs.readdir(path, (err, files) => {
                    var editedFiles = [];
                    console.log(files);
                    files.forEach((file) => {
                        console.log(file);
                        editedFiles.push({
                            path: path +'/'+ file,
                            type: file.substring(file.lastIndexOf('.')),
                            size: fs.statSync(path + '/'+file).size
                        })
                    })
                    resolve(editedFiles);
                });
            }
            catch (e) {
                console.log(e);
                reject(e);
            }
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