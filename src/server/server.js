var { request } = require('https');

var childProcess = require('child_process');
var mongoose = require('mongoose');
var email = require('../server/modules/email');

/*
    SETTING UP MONGO CHILD PROCESS
*/

var mongoProcess = childProcess.spawn('mongod');

global.mongo = mongoose.createConnection('mongodb://localhost:27017');

var express = require('express');

var PORT = 3000;

var app = express();
const corsOptions = {
    origin(origin, callback) {
        callback(null, true);
    },
    credentials: true
};

var cors = require('cors');

app.use(cors(corsOptions));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.static('./dist/'))

var { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
var { makeExecutableSchema } = require('graphql-tools');

var bodyParser = require('body-parser');

var { User, GenericFile, Session } = require('./modules/mongo/schemas')
var { typeDefs, resolvers } = require('./modules/graphql/')

const schema = makeExecutableSchema({
    typeDefs, resolvers
});

app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema, context: { User, GenericFile, Session }
}));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

var path = require('path');
var multer = require('multer');
var upload = multer()
var jwt = require('jsonwebtoken');
var secret = require('./secret');
var fs = require('fs');

app.post('/upload', upload.single('file'), function (req, res) {
    if (req.body.fromSite == 'true') {
        var token = req.body.token;
        try {
            var info;
            if (info = jwt.verify(token, secret)) {
                var file = req.file
                var uPath = req.body.path;
                var tpath = path.resolve('./users/' + info.Username + '/' + uPath + '/' + file.originalname);
                var writeFile = fs.writeFile(tpath, file.buffer, (err, res) => {
                    if (err) throw err;
                });
                res.send('Recived and saved');
            }
        }
        catch (e) {
            res.send('Denied');
        }
    }
    else {
        var key = req.body.key;
    }
})

//app.use(bodyParser.json());


app.get('/filedl', function (req, res) {
    try{
        var info = jwt.verify(req.query.token, secret);
        var _path = path.resolve(__dirname+`../../../users/${info.Username}/${req.query.path}/${req.query.rawName}`);
        res.download(_path, function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
    catch(e){
        res.send('Sorry, invalid something.')
        console.log(e);
    }
})

app.get('/registerUser/:hash', function(req,res){
    User.findOne({registrationHash:req.params.hash}).then((u)=>{
        console.log(u);
        u.approved = true;
        console.log(`APROVED ${u.username}`)
        u.save().then((e)=>res.send(`approved ${u.username}`));
    })
})

app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.listen(PORT, function () {
    console.log('HEWWO????? 0w0')
})

