import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Form from './components/Form'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: '' })

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setNotification({ message: 'Wrong username or password', type: 'error' })

      setTimeout(() => {
        setErrorMessage(null)
        setNotification({ message: null, type: '' })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    window.location.reload()
  }

  const handleNewPost = async (event) => {
    event.preventDefault()

    const newPost = { title, author, url }

    try {
      const response = await blogService.create(newPost)
      setBlogs(blogs.concat(response))
      setNotification({ message: `A new blog "${title}" by ${author} added`, type: 'success' })
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {
        setNotification({ message: null, type: '' })
      }, 5000)
    } catch (exception) {
      setNotification({ message: 'Error adding blog post', type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: '' })
      }, 5000)
    }
  }

  const loginForm = () => (
    <Login
      username={username}
      password={password}
      handleLogin={handleLogin}
      setUsername={setUsername}
      setPassword={setPassword}
    />
  )

  const blogsForm = () => (
    <div>
      <div>
        <h2>Create new</h2>
        <Form
          author={author}
          title={title}
          url={url}
          handleNewPost={handleNewPost}
          setAuthor={setAuthor}
          setTitle={setTitle}
          setUrl={setUrl}
        />
      </div>
      <h2>Posts</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />

      <h2>Blogs</h2>

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>Log out</button>
          {blogsForm()}
        </div>
      }
    </div>
  )
}

export default App
