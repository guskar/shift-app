import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import styles from './style.module.css'

const RegisterForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [registerFailed, setRegisterFailed] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { username, password, firstName, lastName, email };

    // 'http://localhost:8080/api/v1/register'
    // 'https://cscloud8-44.lnu.se/shift/api/v1/auth/register'
 
    const response = await fetch('https://cscloud8-44.lnu.se/shift/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if(response.status === 201) {
      navigate('/login')
    } else {
      setRegisterFailed(true)
    }

  }
  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <label>Username</label>
      <input type="text" value={username} className={styles.input} onChange={(e) => setUsername(e.target.value)} />

      <label>Password</label>
      <input type="password" value={password} className={styles.input} onChange={(e) => setPassword(e.target.value)} />

      <label>First name</label>
      <input type="text" value={firstName} className={styles.input} onChange={(e) => setFirstName(e.target.value)} />

      <label>Last name</label>
      <input type="text" value={lastName} className={styles.input} onChange={(e) => setLastName(e.target.value)} />

      <label>email</label>
      <input type="email" value={email} className={styles.input} onChange={(e) => setEmail(e.target.value)} />

      {registerFailed && <h4>Failed to register new user, make sure every inputfiled is filled in!</h4>}

      <button className={styles.button}>Submit</button>


    </form>
  )

}

export default RegisterForm