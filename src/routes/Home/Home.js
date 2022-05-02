

import { BsShift } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import styles from './style.module.css'

const Home = () => {

  const navigate = useNavigate()






  return (

    <div id='houseDiv'>
      <div id='backgroundDiv'>
        <h1>Sh<BsShift></BsShift>fT - Make a change today</h1>
      </div>
      <div className={styles.registerDiv}>
        <h2>Register now and start shifting!</h2>
        <h5>Get access to all houses!</h5>
        <button className={styles.button} onClick={() => navigate('register')}>Register now</button>
      </div>


    </div>
  )
}

export default Home