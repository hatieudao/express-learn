const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String
});
var Product = mongoose.model('Product', productSchema, 'product');

module.exports = Product;