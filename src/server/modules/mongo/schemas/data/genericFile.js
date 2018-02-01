var mongoose = require('mongoose');
var {Schema} = mongoose;

let File = new Schema({
    filepath: !String,
    uploader: !String,
    uploadDate: !Date,
    fileSize: Number
})

module.exports = mongoose.model('File',File);