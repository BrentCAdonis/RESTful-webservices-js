var should = require('should'),
    sinon = require('sinon');

describe('Client Controller Test', function() {
    describe('Post Function', function() {
        it('should not allow an empty reporting name field on post', function(){
            var Client = function(client){this.save = function(){};};
            var req = {
                body: {
                    reportingname: 'brent'
                }
            };
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            var clientController = require('../controllers/clientController')(Client);

            clientController.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('A Reporting Name is required').should.equal(true);
        });
    });
});