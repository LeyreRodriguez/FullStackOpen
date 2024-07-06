const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;

    if (!username || username.length < 3 || !password || password.length < 3) {
      return response.status(400).json({ error: 'Username and password must be at least 3 characters long.' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(409).json({ error: 'Username already exists.' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    try {
      const savedUser = await user.save();
      response.status(201).json(savedUser);
    } catch (error) {
      response.status(500).json({ error: 'Failed to create user.' });
    }
  });

  usersRouter.get('/', async (request, response) => {
    const users = await User.find({});
    response.json(users);
  });

  module.exports = usersRouter;