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
            var connection = mongoose.createConnection('mongodb://localhost:27017')
            console.log(connection)
            callback(null, connection!=null);
        }
    },
    mongohandler: {
        command: 'node',
        commandArgs: [__dirname + '/modules/mongohandle.js'],
        dependsOn:['mongoInstance'],
        verify: function(port, callback){
           /*  var req = request://localhost:27017');
            fetch(req).then((data)=>console.log(data)); */
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



app.listen(PORT, function () {
    console.log('hello react');
})

