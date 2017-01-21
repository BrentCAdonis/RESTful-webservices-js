var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var clientModel = new Schema({
    name: String,
    reportingname: String,
    tradingas: String,
    abbreviatedname: String,
    entitytype: {
        type: String,
        enum: ['Company', 'Trust', 'Partnership', 'Individual', 'Society', 'Incorporated Society', 'Charitable Trust']
    },
    acn: String,
    countrycode: Number,
    tax: {
        type: Boolean,
        default: true
    },
    taxnumber: String,
    businessnumber: String,
    ledgertext: String,
    ledgervalue: Number
});

module.exports = mongoose.model('Client', clientModel);