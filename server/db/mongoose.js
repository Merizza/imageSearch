var mongoose = require('mongoose');
var mongodb = process.env.MLAB_URI || 'mongodb://localhost:27017/image-search';

mongoose.Promise = global.Promise;
mongoose.connect(mongodb);

module.exports = mongoose;
