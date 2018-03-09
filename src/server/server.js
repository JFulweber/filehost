var { request } = require('https');

var childProcess = require('child_process');
var mongoose = require('mongoose');

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

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.static('./dist/'))

var { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
var { makeExecutableSchema } = require('graphql-tools');

var bodyParser = require('body-parser');

var {User, GenericFile, Session} = require('./modules/mongo/schemas')
var {typeDefs, resolvers} = require('./modules/graphql/')

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

app.post('/upload', upload.single('file'), function(req,res){
/*     console.log(req.file);
    console.log(req.body.user); */
})

var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
    secret:'whatever',
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

app.get('/*', function(req,res){
    res.sendFile(path.resolve(__dirname,'../../dist/index.html'));
});

app.listen(PORT, function () {
    console.log('We\'re up and running!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
})

