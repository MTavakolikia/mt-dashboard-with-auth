import React from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  return (
    <>
    <h3>Forgot Password Page</h3>
     <Link to="/login">Login</Link>-<Link to="/register">Register</Link>
    </>
  )
}

export default ForgotPassword