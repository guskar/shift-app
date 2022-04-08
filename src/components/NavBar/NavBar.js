import { Link } from 'react-router-dom'
import styles from './style.module.css'

const NavBar = () => 
  <div className={styles.navbar}>
    <Link to="/">Home</Link>
    <Link to="/add">Add</Link>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </div>

export default NavBar