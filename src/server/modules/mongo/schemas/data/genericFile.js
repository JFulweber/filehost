var mongoose = require('mongoose');
var {Schema} = mongoose;

let File = new Schema({
    absolutePath: !String,
    userRelativePath: !String,
    uploader: !String,
    uploadDate: !Date,
    fileSize: Number
})

module.exports = mongoose.model('File',File);