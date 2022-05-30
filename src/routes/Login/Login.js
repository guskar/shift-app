
import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import styles from './style.module.css'

/**
 * A route for Login.
 *
 * @returns {React.ReactElement} The login page.
 */
const Login = () => {
  return (
    <div className={styles.loginDiv}>
      <LoginForm></LoginForm>
    </div>
  )
}

export default Login
