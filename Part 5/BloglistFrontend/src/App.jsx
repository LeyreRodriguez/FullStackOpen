import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Form from './components/Form'


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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
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
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    window.location.reload()
  }

  const handleNewPost = async(event) => {
    const newPost = { title: title, author: author, url : url }

    blogService
        .create(newPost)
        .then(response => {
          setBlogs(blogs.concat(response))
          setTimeout(() => {
            setNotification({ message: null, type: '' })
          }, 5000)
        })
  }

  const loginForm = () => (
    <Login username ={username} password={password} handleLogin = {handleLogin} setUsername={setUsername} setPassword={setPassword}></Login>
  )

  const blogsForm = () => (
    <div>
      <div>
        <h2>Create new</h2>
        <br>
        </br>
        <Form author ={author} title={title} url = {url} handleNewPost = {handleNewPost} setAuthor={setAuthor} setTitle={setTitle} setUrl={setUrl}></Form>
        <br></br>
      </div>
      <h2>Posts</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
  return (
    <div>
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