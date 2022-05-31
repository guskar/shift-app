
import { React, useState } from 'react'
import { useNavigate } from 'react-router'
import { backendFetch } from '../../utils/utils'
import FlashMessage from '../FlashMessage/FlashMessage'
import styles from './style.module.css'
/**
 * A Regiaster Component.
 *
 * @returns {React.ReactElement} The Regisaterform.
 */
const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [registerFailed, setRegisterFailed] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const navigate = useNavigate()

  /**
   * Handles the submit event.
   *
   * @param {object} event The event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    const body = { username, password, firstName, lastName, email }
    const response = await backendFetch('auth/register', 'POST', body, true)

    if (response.status === 201) {
      setTimeout(() => {
        navigate('/login')
      }, 2500
      )
      setRegisterSuccess(true)
    } else {
      setRegisterFailed(true)
    }
  }
  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <label>Username</label>
      <input type="text" value={username} className={styles.input} onChange={(e) => setUsername(e.target.value)} required />

      <label>Password</label>
      <input type="password" value={password} className={styles.input} onChange={(e) => setPassword(e.target.value)} required />

      <label>First name</label>
      <input type="text" value={firstName} className={styles.input} onChange={(e) => setFirstName(e.target.value)} required />

      <label>Last name</label>
      <input type="text" value={lastName} className={styles.input} onChange={(e) => setLastName(e.target.value)} required />

      <label>email</label>
      <input type="email" value={email} className={styles.input} onChange={(e) => setEmail(e.target.value)} required />

      {registerFailed && <FlashMessage message={'Register failed, please check that all inputs are filled in'} show={true}></FlashMessage>}
      {registerSuccess && <FlashMessage message={'You have been registered successfully, login and start shifting.'} show={true}></FlashMessage>}
      <button className={styles.button}>Register</button>

    </form>
  )
}

export default RegisterForm
