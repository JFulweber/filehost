var {Schema} = require('mongoose');

let File = new Schema({
    filepath: !String,
    uploader: !String,
    uploadDate: !Date,
    fileSize: !Integer
})