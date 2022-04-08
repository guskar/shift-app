import React from 'react'
import { useState } from 'react'
import styles from './style.module.css'

const RegisterForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { username, password, firstName, lastName, email };
    console.log('submit', body)

    await fetch('http://localhost:8080/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

  }
  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <label>Username</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <label>First name</label>
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

      <label>Last name</label>
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />

      <label>email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />



      <button>Submit</button>


    </form>
  )

}

export default RegisterForm