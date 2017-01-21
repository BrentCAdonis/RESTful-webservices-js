var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var clientModel = new Schema({
    name: String,
    reportingname: String,
    tradingas: String,
    abbreviatedname: String,
    persondetails: [{
        firstname: String,
        middlename: String,
        lastname: String,
        salutation: String
    }],
    entitytype: {
        type: String,
        enum: ['Company', 'Trust', 'Partnership', 'Individual', 'Society', 'Incorporated Society', 'Charitable Trust']
    },
    acn: String,
    country: {
        type: String,
        enum: ['Australia', 'New Zealand', 'South Africa', 'United Kingdon', 'United States']
    },
    countrycode: Number,
    tax: {
        type: Boolean,
        default: true
    },
    taxnumber: String,
    businessnumber: String,
    ledgertext: String,
    ledgervalue: Number,
    datecreated: Date,
    datemodified: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Client', clientModel);