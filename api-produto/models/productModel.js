const mongoose = require('mongoose');

// schema do produto
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  imageUrl: { type: String }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;