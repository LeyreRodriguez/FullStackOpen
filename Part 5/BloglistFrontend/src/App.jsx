import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      noteService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Login username ={username} password={password} handleLogin = {handleLogin} setUsername={setUsername} setPassword={setPassword}></Login>
  )

  const blogsForm = () => (
    <div>
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
          {blogsForm()}
        </div>
      }


    </div>
  )
}

export default App