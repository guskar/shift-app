
import { React, useState } from 'react'
import styles from './style.module.css'
import { saveAccessToken } from '../../utils/auth'
import { useNavigate } from 'react-router'
import FlashMessage from '../FlashMessage/FlashMessage'
import { backendFetch } from '../../utils/utils'

/**
 * A loginform component.
 *
 * @returns {React.ReactElement} The Loginform component.
 */
const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginFailed, setLoginFailed] = useState(false)
  const navigate = useNavigate()

  /**
   * Submits the event.
   *
   * @param {object} event The event object.
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    const body = { username, password }
    setLoginFailed(false)
    // 'http://localhost:8080/api/v1//login'
    // 'https://cscloud8-44.lnu.se/shift/api/v1/auth/login'

    const response = await backendFetch('auth/login', 'POST', body, true)
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
      <input data-testid='username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>

      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

      {loginFailed && <FlashMessage message={'Login failed, check your credentials'} show={true}></FlashMessage>}
      <button>Login</button>

    </form>
  )
}

export default LoginForm
