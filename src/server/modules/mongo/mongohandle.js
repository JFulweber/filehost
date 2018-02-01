var mongoose = require('mongoose');
var {GenericFile, User} = require('./schemas');

mongoose.connect('mongodb://localhost:27017').then((status,err)=>{
    //console.log(status);
    if(err) console.log(err); 
}).catch((err)=>{
    console.log(`Dissa'n error`);
    console.log(err);
});

/* var myFile = new GenericFile({
    filepath: '/myPath/image.jpg',
    uploader: 'intox',
    uploadDate: Date.now(),
    fileSize: 3000000
})

myFile.save(); */

module.exports = mongoose;