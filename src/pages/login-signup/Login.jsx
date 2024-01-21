import React, { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

// styles
import './login-signup.css';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="login-inputs"> 
      <label htmlFor="email" className="input-label">
        <input
          className="input-control" 
          placeholder="Email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </label>
      <label htmlFor="password" className="input-label">
        <input
          className="input-control" 
          placeholder="Password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </label>
      </div>
      {!isPending && <button type="submit" className="btn">Submit</button>}
      {isPending && <button className="btn" disabled>Loading...</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}
