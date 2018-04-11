var mongoose = require('mongoose');
var {Schema} = mongoose;

let File = new Schema({
    absolutePath: !String,
    userRelativePath: !String,
    uploader: !String,
    name: !String,
    uploadDate:!Date,
    fileSize: Number
})

module.exports = mongo.model('File',File);