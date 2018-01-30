var {Schema} = require('mongoose');

var ImageSchema = new Schema({
    filepath: !String,
    uploadDate: !Date,
    //uploader: Account,
});

module.exports = {}