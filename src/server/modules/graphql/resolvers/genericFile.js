var mongoose = mongo;
var fs = require('fs');
var jwt = require('jsonwebtoken');
var secret = 'hellohellohellobigpenor';
// TODO: make secret file
var resolvers = {
    Query: {
        files: async function (parent, args, { GenericFile }) {
            // given args.path, find all top level files and return array of paths
            require('./session').Query.authenticate(args.token).then((auth)=>{
                if(auth==true){
                    var info = jwt.verify(args.token,secret);
                    var path = "/users/"+info.username + args.path;
                    fs.readdir(path, (err, files)=>{
                        var editedFiles = [];
                        files.forEach((file)=>{
                            editedFiles.push({
                                path: path+file,
                                type: file.substring(file.lastIndexOf('.')),
                                size: fs.statSync(path+file).size
                            })
                        })
                        resolve(editedFiles);
                    })
                }
            }).catch(err=>{
                reject(err);
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