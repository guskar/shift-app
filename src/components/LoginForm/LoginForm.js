import React from 'react'
import { useState } from 'react'
import styles from './style.module.css'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { username, password };


    const response = await fetch('http://localhost:8080/api/v1/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()
    console.log(data.access_token)

    function setCookie(name,value,days) {
      var expires = "";
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  setCookie('cookie', data.access_token, 1)
 
  function eraseCookie(name) {   
      document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

    // const createCookieInHour = (cookieName, cookieValue, hourToExpire) => {
    //   let date = new Date();
    //   date.setTime(date.getTime() + (hourToExpire * 60 * 60 * 1000));
    //   document.cookie = cookieName + " = " + cookieValue + "; expires = " + date.toGMTString();


    // }
    // createCookieInHour('acces_token', data.access_token, 5);
    // let cookie = document.cookie.split(';');
    // console.log('cookie : ', cookie);

  }

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>

      <label>Username</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button>Submit</button>

    </form>
  )
}

export default LoginForm