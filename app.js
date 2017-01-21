var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

//MongoDb database configuration and connection to the database
var db = mongoose.connect('mongodb://localhost:27017/examineDb');

//All the required Mongoose schemas and models for the application
var Client = require('./src/models/clientModel');

//Start Express web server.
var app = express();
var port = process.env.PORT || 3000;

//Loading of all middleware used in the application
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Inject API application routes
clientRouter = require('./src/routes/clientRoutes')(Client);

//Application consumption of the API routes
app.use('/api/clients', clientRouter);

//Default application routes
app.get('/', function(req, res) {
    res.send('Welcome to my new javascript API!');
});

//Express web server port listening
app.listen(port, function() {
    console.log('This application is running on port ' + port);
});