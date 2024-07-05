const Blog = require('../models/blog')

const blogs = [
    {
        _id: "6685a5d647f0b79ccf4ae220",
        title : "Hello",
        author : "Mike",
        url : "http://holamundi",
        likes : 2
    },
    {
        _id : "6685a69a89c8d5b14dcbad5b",
        title : "Helasdlo",
        author : "Mike",
        url : "http://holamundi",
        likes : 2
    }

  ]



  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  module.exports = {
    blogs, blogsInDb
  }


