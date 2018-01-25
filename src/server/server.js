var childProcess = require('child_process');
var subprocess = require('subprocess');

/*
    SETTING UP MONGO CHILD PROCESS
*/

var processes = {
    mongoInstance:{
        command: 'mongod',
        commandArgs:[],
        verify: function(port, callback){
            return true;
        }
    },
    mongohandler: {
        command: 'node',
        commandArgs: [__dirname + '/modules/mongohandle.js'],
        dependsOn:['mongoInstance'],
        verify: function(port, callback){
            console.log(port);
            callback(undefined, true);
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

