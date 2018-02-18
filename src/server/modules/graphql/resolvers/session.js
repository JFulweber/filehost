var mongoose = mongo;

var resolvers = {
    Query: {},
    Mutation:{
        createSession: async function(parent, args, {Session}){
            return await new Promise((resolve,reject)=>{
                resolve('hi');
            })
        }
    }
}

module.exports = resolvers;