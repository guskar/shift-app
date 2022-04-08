import React from 'react'
import { useState } from 'react'
import styles from './style.module.css'

const RegisterForm = () => {

  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { userName, password, firstName, lastName, email };

    await fetch('http://localhost:8080/api/v1/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJndXJrYW4iLCJnaXZlbl9uYW1lIjoiR3VzdGF2IiwiZmFtaWx5X25hbWUiOiJLYXJsYmVyZyIsImVtYWlsIjoiZ2hqa2doZ2prMkBzdHVkZW50LmxudS5zZSIsImlhdCI6MTY0OTM5OTQzNSwiZXhwIjoxNjQ5NDM1NDM1fQ.f6eXVNIqxWtYSkurKXwWilcK9bj6-J5hmR7g7tYEcboh0E5G9iTUcUHs_0ymOBXtWHQVwk4P4hhKL7DgyaeAbtesr8BV1p9NNPpAxBOJEHhTor_TvMnJvxcl_pnwtkjDXXf7iwGsZsheMDSq__OKy-EcqGWTW9IbIdRa8iL8FhXhnxCmQhNWJ95fSIMzd17I0m5D7_WrMTyczo-lSJrMOrTPf_XlaFySOCWK8Oq2J96HhNB1PR4TrVCPWAY28rL4j9dVtaFGY0y6hiYSWRaqEuBp-bxkyN1g17i5RdhhjvWLXw0msn8ieDBfDzLMUTFkobigDVaZIlXPWlQWIR_yOA'
      },
      body: JSON.stringify(body)
    })

  }
  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <label>Username</label>
      <input type="text" value={userName} onChange={(e) => setUsername(e.target.value)} />

      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <label>First name</label>
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

      <label>Last name</label>
      <input type="text" value={firstName} onChange={(e) => setLastName(e.target.value)} />

      <label>email</label>
      <input type="email" value={firstName} onChange={(e) => setEmail(e.target.value)} />



      <button>Submit</button>


    </form>
  )

}

export default RegisterForm