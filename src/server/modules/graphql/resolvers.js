
var { fileLoader, mergeTypes } = require('merge-graphql-schemas');
var path = require('path');
const resolvers = fileLoader(path.join(__dirname, '/resolvers/'));

module.exports = mergeTypes(resolvers);