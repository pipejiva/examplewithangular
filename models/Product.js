var mongoose = require('mongoose');

var Product = mongoose.Schema({
    code:String,
    name: String,
    weight: Number,
    price: Number
});

module.exports = mongoose.model('Product',Product);