var { request } = require('https');

var childProcess = require('child_process');
var mongoose = require('mongoose');
var email = require('../server/modules/email');

console.log((() => {
    return false;
}) ? "true" : "false");
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

app.post('/upload', upload.single('files'), function (req, res) {
    if (req.body.fromSite == 'true') {
        var token = req.body.token;
        try {
            var info;
            if (info = jwt.verify(token, secret)) {
                var file = req.file;
                var uPath = req.body.path;
                var path = path.resolve('../../users/'+info.username+'/'+uPath);
                fs.writeFileSync(path, file);
                res.send('i got et');
            }
        }
        catch (e) {
            res.send('it no go through');
        }
    }
    else {
        var key = req.body.key;
    }
})

var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: 'whatever',
    saveUninitialized: true,
    resave: true,
    cookie: {
        httpOnly: false
    },
    store: new MongoStore({
        url: 'mongodb://localhost:27017/storedb',
        ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    })
}))

app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.listen(PORT, function () {
    console.log('We\'re up and running!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
})

