import React from 'react'
import { useState } from 'react'
import styles from './style.module.css'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {username, password};

    
    const response = await fetch('http://localhost:8080/api/v1/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()
    console.log(data)

  }

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>

      <label>Username</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button>Submit</button>

    </form>
  )
}

export default LoginForm