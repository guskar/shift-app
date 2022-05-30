import React from 'react'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import styles from './style.module.css'

/**
 * A route for register.
 *
 * @returns {React.ReactElement} The registerform.
 */
const Register = () => {
  return (
    <div className={styles.registerDiv}>
      <RegisterForm></RegisterForm>
   </div>
  )
}

export default Register
