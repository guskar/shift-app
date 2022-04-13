import { Link } from 'react-router-dom'
import { useIsLoggedIn } from '../../utils/utilhooks'
import styles from './style.module.css'


const NavBar = () => {
  const isLoggedIn = useIsLoggedIn()

  return (
    <div className={styles.navbar}>
      <Link to="/">Home</Link>
      
      {!isLoggedIn && <Link to="/login">Login</Link>}
      {isLoggedIn ? <Link to="/logout">Logout</Link> : <Link to="/register">Register</Link>}
      {isLoggedIn && <Link to="/add">Add house</Link> }
      {isLoggedIn && <Link to="/add">My houses</Link> }
      
    </div>
  )
}

export default NavBar