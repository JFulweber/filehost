var childProcess = require('child_process');

/*
    SETTING UP MONGO CHILD PROCESS
*/

var mongoprocess = childProcess.fork('./src/server/modules/mongohandle.js');
console.log(mongoprocess)
mongoprocess.on('stdio',data=>{console.log(`From mongo child process ${data}`)})

var express = require('express');

var PORT = 3000;

var app = express();


app.use(express.static('./dist/'))



app.listen(PORT,function(){
    console.log('hello react');
})

