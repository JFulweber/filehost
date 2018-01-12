var express = require('express');
var PORT = 3000;

var app = express();

app.use(express.static('../../dist/'))

app.listen(PORT,function(){
    console.log('hello reACT');
})

