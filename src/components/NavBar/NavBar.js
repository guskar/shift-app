import { Link } from 'react-router-dom'
import { useIsLoggedIn } from '../../utils/utilhooks'
import styles from './style.module.css'
import { BsShift} from 'react-icons/bs'
import { getLoggedInUserName } from '../../utils/auth'


const NavBar = () => {
  const isLoggedIn = useIsLoggedIn()

  return (
    <div className={!window.scroll()? styles.navbar : styles.navbarScroll}>
       <h1 className={styles.h1}>Sh<BsShift></BsShift>fT</h1>
      {!isLoggedIn && <Link to="/">Home</Link>}
      {!isLoggedIn && <Link to="/login">Login</Link>}
      {isLoggedIn ? <Link to="/logout">Logout</Link> : <Link to="/register">Register</Link>}
      {isLoggedIn && <Link to="/userhouses">Your houses</Link> }
      {isLoggedIn && <Link  className={styles.username} to="/profile">{getLoggedInUserName()}</Link>}
      
    </div>
  )
}

export default NavBar