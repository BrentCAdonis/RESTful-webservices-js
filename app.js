var express = require('express'),
    mongoose = require('mongoose');

//MongoDb database configuration and connection to the database
var db = mongoose.connect('mongodb://192.168.20.60:27017/examineDb');

//All the required Mongoose schemas and models for the application
var client = require('./src/models/clientModel');

//Start Express web server.
var app = express();
var port = process.env.PORT || 3000;

//Start: Retrieving clients API
//These are the application routes for now
var clientRouter = express.Router();

clientRouter.route('/clients')
    .get(function(req, res) {
        var query = [];
    
        if(req.query.name) {
            query.name = req.query.name;
        }

        client.find(query, function(err, clients) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(clients);
            }
        });
    });

clientRouter.route('/clients/clientId')
    .get(function(req, res) {
        client.findById(req.params.clientId, function(err, client) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(client);
            }
        });
    });

//Application consumption of the API routes
app.use('/api', clientRouter);

//Default application routes
app.get('/', function(req, res) {
    res.send('Welcome to my new javascript API!');
});

//Express web server port listening
app.listen(port, function() {
    console.log('This application is running on port ' + port);
});