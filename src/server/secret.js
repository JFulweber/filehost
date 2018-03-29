var fs = require('fs');
var buf = fs.readFileSync('./secretFile');

module.exports = buf;