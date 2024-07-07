const { test, after, beforeEach, describe, it } = require('node:test')
const assert = require('node:assert')

const Blog = require('../models/blog')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')


beforeEach(async () => {
    await User.deleteMany({});
  });



  describe('User creation', () => {
    test('Should not create a user without username', async () => {
      const response = await supertest(app)
        .post('/api/users')
        .send({ password: 'password123' })
        .expect(400);

      assert.strictEqual(response.body.error, 'Username and password must be at least 3 characters long.');
    });

    test('Should not create a user without password', async () => {
      const response = await supertest(app)
        .post('/api/users')
        .send({ username: 'user1' })
        .expect(400);

      assert.strictEqual(response.body.error, 'Username and password must be at least 3 characters long.');
    });

    test('Should not create a user with short username', async () => {
      const response = await supertest(app)
        .post('/api/users')
        .send({ username: 'us', password: 'password123' })
        .expect(400);

      assert.strictEqual(response.body.error, 'Username and password must be at least 3 characters long.');
    });

    test('Should not create a user with short password', async () => {
      const response = await supertest(app)
        .post('/api/users')
        .send({ username: 'user1', password: 'pw' })
        .expect(400);

      assert.strictEqual(response.body.error, 'Username and password must be at least 3 characters long.');
    });

    test('Should not create a user with an existing username', async () => {
      const user = new User({ username: 'user1', passwordHash: 'passwordHash123' });
      await user.save();

      const response = await supertest(app)
        .post('/api/users')
        .send({ username: 'user1', password: 'anotherpassword' })
        .expect(409);

      assert.strictEqual(response.body.error, 'Username already exists.');
    });

    test('Should create a user with valid username and password', async () => {
      const response = await supertest(app)
        .post('/api/users')
        .send({ username: 'validuser', password: 'validpassword' })
        .expect(201);

      assert.strictEqual(response.body.username, 'validuser');
      const user = await User.findOne({ username: 'validuser' });
      assert(user !== null);
    });
  });

  describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash('sekret', 10);
      const user = new User({ username: 'root', passwordHash });

      await user.save();
    });

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      };

      await supertest(app)
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

      const usernames = usersAtEnd.map(u => u.username);
      assert(usernames.includes(newUser.username));
    });
  });


  after(async () => {
    await mongoose.connection.close();
  });