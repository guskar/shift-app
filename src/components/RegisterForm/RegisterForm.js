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
   
 // const response = await fetch('https://cscloud8-44.lnu.se/shift/api/v1/auth/register'
    const response = await fetch('http://localhost:8080/api/v1/register', {
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
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <label>First name</label>
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

      <label>Last name</label>
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />

      <label>email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      {registerFailed && <h4>Failed to register new user, make sure every inputfiled is filled in!</h4>}

      <button>Submit</button>


    </form>
  )

}

export default RegisterForm