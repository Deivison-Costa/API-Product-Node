const request = require('supertest');
const app = require('../app');
const conn = require('../db/conn');

const User = require('../models/userModel');
const Product = require('../models/productModel');

beforeAll(async () => {
  // conecta ao banco de dados antes de todos os testes e limpa as coleções
  await conn();
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

  // teste para criar um novo produto 1
  it('Deve criar um novo produto 1', async () => {
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

  // teste para criar um novo produto 2
  it('Deve criar um novo produto 2', async () => {
    const response = await request(app)
      .post('/products')
      .set('Authorization', `${token}`)
      .send({ 
        name: 'Produto de Teste 2', 
        description: 'Descrição do Produto de Teste 2', 
        price: 29.99, 
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Bola_de_futebol.jpg' });
    expect(response.status).toBe(201);
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
    expect(response.body).toHaveLength(2); // número esperado de produtos por página
  });

  // teste para validar se o preço do produto é um número positivo
  it('Deve retornar erro ao criar um produto com preço negativo', async () => {
    const response = await request(app)
      .post('/products')
      .set('Authorization', `${token}`)
      .send({ 
        name: 'Produto de Teste', 
        description: 'Descrição do Produto de Teste', 
        price: -10, 
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Bola_de_futebol.jpg' });
    expect(response.status).toBe(400);
  });

  // teste para buscar produtos pelo nome ou descrição
  it('Deve buscar produtos pelo nome ou descrição', async () => {
    const response = await request(app)
      .get('/products?searchTerm=Produto')
      .set('Authorization', `${token}`);
    expect(response.status).toBe(200);
    // verifica se o resultado da busca contém o produto criado anteriormente
    expect(response.body.some(product => product.name === 'Produto de Teste 2')).toBeTruthy();
  });

  // teste para ordenar produtos pelo nome
  it('Deve ordenar produtos pelo nome', async () => {
    const response = await request(app)
      .get('/products?sortBy=name&sortOrder=asc')
      .set('Authorization', `${token}`);
    expect(response.status).toBe(200);
    // verifica se os produtos estão ordenados pelo nome em ordem ascendente
    expect(response.body[0].name).toBe('Novo Nome');
  });

  // teste para ordenar produtos pelo preço
  it('Deve ordenar produtos pelo preço', async () => {
    const response = await request(app)
      .get('/products?sortBy=price&sortOrder=asc')
      .set('Authorization', `${token}`);
    expect(response.status).toBe(200);
    // verifica se os produtos estão ordenados pelo preço em ordem ascendente
    expect(response.body[0].price).toBe(29.99);
  });
  // teste para excluir um produto
  it('Deve excluir um produto existente', async () => {
    const response = await request(app)
      .delete(`/products/${productId}`) 
      .set('Authorization', `${token}`);
    expect(response.status).toBe(200);
  });
});
