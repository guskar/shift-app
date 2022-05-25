import React from 'react'
import { BsShift } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import styles from './style.module.css'
/**
 * A route rendering the homepage.
 *
 * @returns {React.ReactElement} Renders the homepage.
 */
const Home = () => {
  const navigate = useNavigate()
  return (

    <div id='houseDiv'>
      <div id='backgroundDiv'>
        <h1>Sh<BsShift></BsShift>fT - Make a change today</h1>
      </div>
      <div className={styles.footerDiv}>
        <h2>Register now and start shifting!</h2>
        <h5>Get access to all houses today!</h5>
        <button className={styles.button} onClick={() => navigate('register')}>Register</button>
      </div>

    </div>
  )
}
export default Home
