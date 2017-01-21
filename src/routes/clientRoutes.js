var express = require('express');

var router = function(Client) {
    var clientRouter = express.Router();

    clientRouter.route('/')
        .post(function(req, res) {
            var client = new Client(req.body);
            console.log(client);
            client.save();
            res.status(201).send(client);
    })

        .get(function(req, res) {
            var query = [];
    
            if(req.query.name) {
                query.name = req.query.name;
            }

            Client.find(query, function(err, clients) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(clients);
                }
            });
        });

    clientRouter.route('/:clientId')
        .get(function(req, res) {
            Client.findById(req.params.clientId, function(err, client) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(client);
                }
            });
        });

    return clientRouter;
};

module.exports = router;