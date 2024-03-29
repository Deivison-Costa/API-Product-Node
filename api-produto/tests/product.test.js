const request = require('supertest');
const app = require('../app');
const conn = require('../db/conn');

const User = require('../models/userModel');
const Product = require('../models/productModel');

beforeAll(async () => {
  // conecta ao banco de dados antes de todos os testes e limpa as coleções
  conn();
  await User.deleteMany({});
  await Product.deleteMany({});
});

describe('Testes da API', () => {
  let token;
  let productId; 
  // teste para registro de usuário
  it('Deve registrar um novo usuário', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ username: 'usuario_teste', password: 'senha_teste' });
    expect(response.status).toBe(201);
  });  
  // teste para login de usuário
  it('Deve fazer login e retornar um token JWT', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'usuario_teste', password: 'senha_teste' });
    expect(response.status).toBe(200);
    token = response.body.token;
  });
  // teste para criar um novo produto
  it('Deve criar um novo produto', async () => {
    const response = await request(app)
      .post('/products')
      .set('Authorization', `${token}`)
      .send({ 
        name: 'Produto de Teste', 
        description: 'Descrição do Produto de Teste', 
        price: 19.99, 
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Bola_de_futebol.jpg' });
    expect(response.status).toBe(201);
    productId = response.body._id;
  });
  // teste para atualizar um produto existente
  it('Deve atualizar um produto existente', async () => {
    const response = await request(app)
      .put(`/products/${productId}`) 
      .set('Authorization', `${token}`)
      .send({ name: 'Novo Nome', description: 'Nova Descrição', price: 29.99 });
    expect(response.status).toBe(200);
  });
  // teste para listar produtos com paginação
  it('Deve listar os produtos com paginação', async () => {
    const response = await request(app)
      .get('/products?page=1&limit=10')
      .set('Authorization', `${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1); // nº esperado de produtos por página
  });
  // teste para excluir um produto
  it('Deve excluir um produto existente', async () => {
    const response = await request(app)
      .delete(`/products/${productId}`) 
      .set('Authorization', `${token}`);
    expect(response.status).toBe(200);
  });
});
