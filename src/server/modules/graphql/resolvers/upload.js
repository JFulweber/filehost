var { GraphQLUpload } = require('apollo-upload-server');
var mongoose = require('../../mongo/mongohandle');

var resolvers = {
    Upload: GraphQLUpload,
    Mutation: {
        singleUpload: async function(parent, args, context){
            console.log(args);
            return true;
        }
    }
}

module.exports = resolvers;