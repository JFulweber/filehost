var { request } = require('https');

var childProcess = require('child_process');
var subprocess = require('subprocess');
var mongoose = require('mongoose');
/*
    SETTING UP MONGO CHILD PROCESS
*/

var processes = {
    mongoInstance:{
        command: 'mongod',
        commandArgs:[],
        verifyInterval: 300,
        verifyTimeout: 5000,
        verify: function(port, callback){
            var connection = mongoose.connect('mongodb://localhost:27017')
            connection.then((status,err)=>{
                if(err!=undefined){
                    callback(err,false)
                }
                else{
                    callback(null, true);
                }
                mongoose.disconnect();                
            })
        }
    },
    mongohandler: {
        command: 'node',
        commandArgs: [__dirname + '/modules/mongo/mongohandle.js'],
        dependsOn:['mongoInstance'],
        verify: function(port, callback){
            var connection = mongoose.connect('mongodb://localhost:27017')
            connection.then((status,err)=>{
                if(err!=undefined){
                    callback(err,false)
                }
                else{
                    callback(null, true);
                }
                mongoose.disconnect();
            })
        }
    },
}

subprocess(processes, function (error, processes) {
   // console.log(processes)
    if (error) {
        console.error(error.stack);
        process.exit(1);
    }
    console.log('processes started successfully!');
});

var express = require('express');

var PORT = 3000;

var app = express();


app.use(express.static('./dist/'))

var { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
var { apolloUploadExpress } = require('apollo-upload-server');
var { makeExecutableSchema } = require('graphql-tools');

var bodyParser = require('body-parser');

var {User, GenericFile} = require('./modules/mongo/schemas')
var {typeDefs, resolvers} = require('./modules/graphql/')

const schema = makeExecutableSchema({
   typeDefs, resolvers
});

app.use('/graphql', bodyParser.json(), apolloUploadExpress(), graphqlExpress({
    schema, context: { User, GenericFile}
}));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, function () {
    console.log('hello react');
})

