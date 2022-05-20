import React from 'react'
import { Link } from 'react-router-dom'
import { useIsLoggedIn } from '../../utils/utilhooks'
import styles from './style.module.css'
import { BsShift } from 'react-icons/bs'
import { getLoggedInUserName } from '../../utils/auth'

/**
 * A navbar component.
 *
 * @returns {React.ReactElement} The navbar component.
 */
const NavBar = () => {
  const isLoggedIn = useIsLoggedIn()

  return (
    <div className={ styles.navbar }>
       <h1 className={styles.h1}>Sh<BsShift></BsShift>fT</h1>
      {!isLoggedIn && <Link className={styles.link} to="/">Home</Link>}
      {!isLoggedIn && <Link className={styles.link} to="/login">Login</Link>}
      {isLoggedIn ? <Link className={styles.link} to="/logout">Logout</Link> : <Link to="/register">Register</Link>}
      {isLoggedIn && <Link className={styles.link} to="/profile">Search houses</Link> }
      {isLoggedIn && <Link className={styles.username} to="/userhouses">{getLoggedInUserName()}</Link>}

    </div>
  )
}

export default NavBar
