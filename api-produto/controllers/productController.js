const Product = require('../models/productModel');
const NodeCache = require('node-cache');

const cache = new NodeCache();

// retorna todos os produtos com paginação, pesquisa, e ordenação
exports.getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = req.query.sortBy || '_id';
  const sortOrder = req.query.sortOrder || 'asc';
  const searchTerm = req.query.searchTerm || '';

  const cacheKey = `products_${page}_${limit}_${sortBy}_${sortOrder}_${searchTerm}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  const sortOptions = {};
  sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

  try {
    let query = {};
    if (searchTerm) {
      query = { $or: [{ name: { $regex: searchTerm, $options: 'i' } }, { description: { $regex: searchTerm, $options: 'i' } }] };
    }
    
    const products = await Product.find(query).skip(skip).limit(limit).sort(sortOptions);
    cache.set(cacheKey, products);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// cria um novo produto
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // valida se o preço é um número positivo
    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ message: 'Price must be a positive number' });
    }

    const product = new Product({ name, description, price });

    const newProduct = await product.save();
    // limpa cache após criar um novo produto
    cache.flushAll();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// atualiza um produto
exports.updateProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    // limpa o cache após atualizar um produto
    cache.flushAll();
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// deleta um produto
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    // limpa a cache após deletar um produto
    cache.flushAll();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// upload de imagens
exports.uploadImage = (req, res) => {
  const imageUrl = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
  res.json({ imageUrl });
};
