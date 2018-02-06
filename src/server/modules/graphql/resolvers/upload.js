var { GraphQLUpload } = require('apollo-upload-server');
var mongoose = require('../../mongo/mongohandle');

var resolvers = {
    Upload: GraphQLUpload
}

module.exports = resolvers;