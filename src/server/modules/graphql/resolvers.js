
var { fileLoader, mergeResolvers } = require('merge-graphql-schemas');
var path = require('path');
const resolvers = fileLoader(path.join(__dirname, '/resolvers/'));
//console.log(mergeTypes(resolvers));
module.exports = mergeResolvers(resolvers);