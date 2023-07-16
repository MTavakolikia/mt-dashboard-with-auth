import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <>
    <h3>Register Page</h3>
     <Link to="/login">Login</Link>-<Link to="/forgot-password">Forgot Password</Link>
    </>
  )
}

export default Register