var mongoose = mongo;

var resolvers = {
    Query: {
        files: async function (parent, args, { GenericFile }) {

            return {};
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