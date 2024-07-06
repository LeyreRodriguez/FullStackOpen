const { test, after, beforeEach, describe, it } = require('node:test')
const assert = require('node:assert')

const Blog = require('../models/blog')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.blogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.blogs[1])
    await blogObject.save()
  })


describe(' initial testing', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test.only('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test.only('there are two blogs', async () => {
      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, 2)
    })
})



  describe('Blog model', () => {
    it('should have an id property instead of _id', () => {
      const blog = new Blog({
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
      });

      const blogObject = blog.toJSON();

      assert.strictEqual(blogObject.id !== undefined, true);
      assert.strictEqual(blogObject._id, undefined);
    });
  });


  describe('Addition post', () => {
    test('a valid post can be added ', async () => {
      const blog = new Blog({
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
      });
      await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.blogs.length + 1)

    assert(contents.includes('Hello'))
    })
  })


  describe('Empty parameter', () => {
    test('blog without likes is set as 0', async () => {
      const blog = new Blog({
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      });

      // Post the blog and expect a 201 response
      const response = await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      // Fetch the created blog's ID from the response
      const createdBlogId = response.body.id;

      // Fetch the blog from the database
      const createdBlog = await api.get(`/api/blogs/${createdBlogId}`);

      // Verify that the likes property is set to 0
      assert.strictEqual(createdBlog.body.likes, 0);
    });
  })


  describe('Deletion test', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

      const contents = blogsAtEnd.map(r => r.id);
      assert(!contents.includes(blogToDelete.id));
    });

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '123456invalid';

      await api
        .delete(`/api/blogs/${invalidId}`)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      const blogsAtStart = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
    });

  });







after(async () => {
  await mongoose.connection.close()
})


