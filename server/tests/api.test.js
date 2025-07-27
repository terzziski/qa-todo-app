const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Reuse your server setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

let todos = [];
let currentId = 1;
const USER = { username: 'admin', password: 'admin' };

// Copy your route handlers
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    return res.status(200).json({ token: 'fake-jwt-token' });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

app.get('/items', (req, res) => {
  res.json(todos);
});

app.post('/items', (req, res) => {
  const { text } = req.body;
  const newItem = { id: currentId++, text };
  todos.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const item = todos.find((t) => t.id == id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  item.text = text;
  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id == id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });
  todos.splice(index, 1);
  res.status(204).send();
});

describe('API Tests', () => {
  let createdItemId;

  test('Login with valid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'admin' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('Login with invalid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'user', password: 'wrong' });

    expect(res.statusCode).toBe(401);
  });

  test('Create a new item', async () => {
    const res = await request(app)
      .post('/items')
      .send({ text: 'Test Todo' });

    expect(res.statusCode).toBe(201);
    expect(res.body.text).toBe('Test Todo');
    createdItemId = res.body.id;
  });

  test('Get all items', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Edit item', async () => {
    const res = await request(app)
      .put(`/items/${createdItemId}`)
      .send({ text: 'Updated Todo' });

    expect(res.statusCode).toBe(200);
    expect(res.body.text).toBe('Updated Todo');
  });

  test('Delete item', async () => {
    const res = await request(app)
      .delete(`/items/${createdItemId}`);

    expect(res.statusCode).toBe(204);
  });

  test('Fail to edit non-existent item', async () => {
    const res = await request(app)
      .put(`/items/9999`)
      .send({ text: 'No such item' });

    expect(res.statusCode).toBe(404);
  });
});
