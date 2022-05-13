import React from 'react'
import { useState } from 'react'
import styles from './style.module.css'
import { saveAccessToken } from '../../utils/auth'
import { useNavigate } from 'react-router'
import FlashMessage from '../FlashMessage/FlashMessage'

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
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>

      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

      {loginFailed && <FlashMessage message={'Login failed, check your credentials'} show={true} type={'error'}></FlashMessage>}
      <button>Submit</button>

    </form>
  )
}

export default LoginForm