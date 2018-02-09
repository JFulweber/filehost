var { GraphQLUpload } = require('apollo-upload-server');
var mongoose = require('../../mongo/mongohandle');

const processUpload = async upload => {
    const { stream, filename, mimetype, encoding } = await upload
    console.log(stream);
    return null;
}

var resolvers = {
    Upload: GraphQLUpload,
    Query:{
        uploads: async function(parents, args){ return {} }
    },
    Mutation: {
        singleUpload: (obj, { file }) => processUpload(file)
    }
}

module.exports = resolvers;