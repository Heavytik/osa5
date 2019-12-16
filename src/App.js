import React, { useState, useEffect } from 'react';
import './App.css';
import blogService from './services/blogs';
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    blogService.getAll()
      .then(data => setBlogs(data))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const notLogged = () => {
    return (
      <LoginForm submit={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
    )
  }

  const loggedIn = () => {
    const blogList = () => blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
    return (
      <div>
        <NewBlogForm notification={shortNotification} />
        <ul>
          {blogList()}
        </ul>
        <button onClick={handleLogout()}>Log out {user.name}</button>
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(event);

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      shortNotification('wrong username or password')
      console.log("error")
    }
  }

  const shortNotification = (message) => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }

  const handleLogout = () => () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <div>
      <h1>Blogit</h1>
      <Notification message={notificationMessage} />
      {user === null ? notLogged() : loggedIn()}
    </div>
  );
}

export default App;