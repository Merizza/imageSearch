var mongoose = require('mongoose');

var SearchHistory = new mongoose.Schema({
  query: String,
  time: Date
}, {versionKey: false});

//var SearchHistory = mongoose.model('SearchHistory', {
//  query: String,
//  time: String
//});

var Latest = mongoose.model('Latest', SearchHistory);

module.exports = {Latest};
