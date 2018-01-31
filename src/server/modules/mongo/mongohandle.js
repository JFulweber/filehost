var mongoose = require('mongoose');
var {User} = require('./schemas');

mongoose.connect('mongodb://localhost:27017').then((status,err)=>{
    //console.log(status);
    if(err) console.log(err); 
}).catch((err)=>{
    console.log(`Dissa'n error`);
    console.log(err);
});

console.log(User);

var testUser = new User({
    username: "jeff",
    email: "jeff@jeff.com",
    hashedPass: "whdah38",
    creationDate: Date.now()
});

var res = testUser.save();
console.log(res);