var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017').then((status,err)=>{
    console.log(status);
    if(err) console.log(err); 
}).catch((err)=>{
    console.log(`Dissa'n error`);
    console.log(err);
});
