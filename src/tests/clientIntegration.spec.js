var should = require('should'),
    request = require('supertest'),
    app = ('../../app.js'),
    mongoose = require('mongoose'),
    Client = require('../models/clientModel'),
//    Client = mongoose.model('Client'),
    agent = request.agent(app);

describe('Client CRUD Test.', function() {
    it('Should allow a client to be posted and returned read property and an _id.', function(done) {
        var newClient = {name: 'The Warehouse Stationary', entitytype: 'Company', country: 'Australia', tax: true};

        agent.post('/api/clients')
            .send(newClient)
            .expect(200)
            .end(function(err, results) {
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done();
            });
    });

    afterEach(function(done) {
        Client.remove().exec();
        done();
    });
});