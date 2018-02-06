var mongoose = require('mongoose');
var {GenericFile, User} = require('./schemas');

mongoose.connect('mongodb://localhost:27017').then((status,err)=>{
    if(err) console.log(err); 
}).catch((err)=>{
    console.log(`Dissa'n error`);
    console.log(err);
});

module.exports = mongoose;