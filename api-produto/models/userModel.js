const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// schema do usuário
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// criptografa a senha antes de salvar o usuário
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// compara a senha com a armazenada no banco de dados
const User = mongoose.model('User', userSchema);

module.exports = User;