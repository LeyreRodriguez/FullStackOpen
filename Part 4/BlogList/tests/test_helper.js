const Blog = require('../models/blog')
const User = require('../models/user')


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

  const nonExistentId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'temp', url: 'temp' });
    await blog.save();
    await blog.remove();
    return blog._id.toString();
  };
  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

  module.exports = {
    blogs, blogsInDb, nonExistentId,usersInDb
  }


