var express = require('express');

//Start Express web server.
var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.send('Welcome to my new javascript API!');
});

app.listen(port, function() {
    console.log('This application is running on port ' + port);
});