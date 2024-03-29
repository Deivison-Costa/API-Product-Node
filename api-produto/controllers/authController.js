const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NodeCache = require('node-cache');
const User = require('../models/userModel');
const cache = new NodeCache();
const jwtSecret = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({ username, password });
    await user.save();
    // limpa o cache após o registro de um novo usuário
    cache.del('allUsers');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const cachedUsers = cache.get('allUsers');
    let user;
    if (cachedUsers) {
      user = cachedUsers.find(user => user.username === username);
    } else {
      user = await User.findOne({ username });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
