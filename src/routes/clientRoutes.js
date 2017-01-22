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

    clientRouter.use('/:clientId', function(req, res, next) {
        Client.findById(req.params.clientId, function(err, client) {
                if (err) {
                    res.status(500).send(err);
                } else if (client) {
                    req.client = client;
                    next();
                } else {
                    res.status(404).send('No client has been found with that ID.');
                }
            });
    });

    clientRouter.route('/:clientId')
        .get(function(req, res) {
            res.json(req.client);
        })

        .put(function(req, res) {
            req.client.name = req.body.name;
            req.client.reportingname = req.body.reportingname;
            req.client.tradingas = req.body.tradingas;
            req.client.abbreviatedname = req.body.abbreviatedname;
            req.client.entitytype = req.body.entitytype;
            req.client.acn = req.body.acn;
            req.client.country = req.body.country;
            req.client.tax = req.body.tax;
            req.client.taxnumber = req.body.taxnumber;
            req.client.businessnumber = req.body.businessnumber;
            req.client.ledgertext = req.body.ledgertext;
            req.client.ledgervalue = req.body.ledgervalue;
            req.client.datemodified = req.body.datemodified;
            req.client.persondetails = req.body.persondetails;

            console.log(req.client);

            req.client.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.client);
                }
            });
        })

        .patch(function(req, res) {
             if (req.body._id)
                delete req.body._id;
            
            for (var p in req.body)
            {
                req.client[p] = req.body[p];
            }
            
            console.log(req.client);

            req.client.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.client);
                }
            });
        })

        .delete(function(req, res) {
            req.client.remove(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.client);
                }
            });
        });

    return clientRouter;
};

module.exports = router;