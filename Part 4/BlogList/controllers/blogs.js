const blogsRouter = require('express').Router()
const express = require('express')
require('express-async-errors')
const Blog = require('../models/blog')




  blogsRouter.get('/', async (request, response) => {
    try {
      const blogs = await Blog.find({});
      response.json(blogs);
    } catch (error) {
      response.status(500).json({ error: 'Something went wrong' });
    }
  });

  blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  })

  blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  })

  blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  })




module.exports = blogsRouter