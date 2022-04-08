import React from 'react'
import { useState } from 'react'
import styles from './style.module.css'

const LoginForm = () => {

  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {userName, password};

    
    await fetch('http://localhost:8080/api/v1/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })


  }

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>

      <label>Username</label>
      <input type="Password" value={userName} onChange={(e) => setUsername(e.target.value)} />

      <label>Description</label>
      <input type="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button>Submit</button>

    </form>
  )
}

export default LoginForm