import { Link } from 'react-router-dom'
import { useIsLoggedIn } from '../../utils/utilhooks'
import styles from './style.module.css'
import { MdSearch } from 'react-icons/md';

const NavBar = () => {
  const isLoggedIn = useIsLoggedIn()

  return (
    <div className={styles.navbar}>
      <Link to="/">Home</Link>
      {!isLoggedIn && <Link to="/login">Login</Link>}
      {isLoggedIn ? <Link to="/logout">Logout</Link> : <Link to="/register">Register</Link>}
      {isLoggedIn && <input type='text' placeholder='Where to go?'></input>}
      {isLoggedIn && <MdSearch></MdSearch>}
    </div>
  )
}

export default NavBar