var clientController = function(Client) {

    var post = function(req, res) {
        var client = new Client(req.body);

        if (!req.body.name) {
            res.status(400);
            res.send('A Reporting Name is required.');
        } else {
            client.save();
            res.status(201);
            res.send(client);
        }
    };

    var get = function(req, res) {
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
    };

    return {
        post: post,
        get: get
    };
};

module.exports = clientController;