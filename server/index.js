const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express(); // Initialize express app
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage
let todos = [];
let currentId = 1;

// Dummy user for login
const USER = { username: 'admin', password: 'admin' };

// ✅ Login route — sends back a token
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    return res.status(200).json({ success: true, token: 'fake-jwt-token' });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// ✅ Get all todo items
app.get('/items', (req, res) => {
  res.json(todos);
});

// ✅ Add a new todo item
app.post('/items', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Text is required' });

  const newItem = { id: currentId++, text };
  todos.push(newItem);
  res.status(201).json(newItem);
});

// ✅ Update a todo item
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const item = todos.find((t) => t.id == id);
  if (!item) return res.status(404).json({ message: 'Item not found' });

  item.text = text;
  res.json(item);
});

// ✅ Delete a todo item
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id == id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });

  todos.splice(index, 1);
  res.status(204).send();
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
