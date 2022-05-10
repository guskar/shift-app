import React from 'react'
import { useState } from 'react'
import styles from './style.module.css'
import { saveAccessToken } from '../../utils/auth'
import { useNavigate } from 'react-router'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginFailed, setLoginFailed] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { username, password };
    setLoginFailed(false)
    // 'http://localhost:8080/api/v1//login'
    //'https://cscloud8-44.lnu.se/shift/api/v1/auth/login'
   
    const response = await fetch('https://cscloud8-44.lnu.se/shift/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()
    

    if (data.access_token) {
      saveAccessToken(data.access_token)
      navigate('/profile')
    } else {
      setLoginFailed(true)
     
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>

      <label>Username</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      {loginFailed && <h4>Login failed. Check your credentials!</h4>}
      <button>Submit</button>

    </form>
  )
}

export default LoginForm