const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const mockUsers = [
  { id: 1, email: 'user1@example.com', password: '$2b$10$3LpPHbvE5TR9q21GVLmaQO1M5.R5U9PBTVBfQDutBlvYRj4mLKyZm' },
  { id: 2, email: 'user2@example.com', password: '$2b$10$3LpPHbvE5TR9q21GVLmaQO1M5.R5U9PBTVBfQDutBlvYRj4mLKyZm' },
];

exports.signup = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide both email and password.' });
  }

  const existingUser = mockUsers.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User with this email already exists.' });
  }

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;

    const newUser = { id: mockUsers.length + 1, email, password: hash };
    mockUsers.push(newUser);

    res.status(201).json({ message: 'User created successfully.', user: newUser });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide both email and password.' });
  }

  const user = mockUsers.find((u) => u.email === email);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, email: user.email }, keys.jwtSecret, { expiresIn: '1h' });

    return res.json({ token });
  }

  return res.status(401).json({ error: 'Invalid credentials.' });
};
