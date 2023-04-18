import React from 'react'
import { Link } from 'react-router-dom'
import Home from './Home'
const ErrorPage = () => {
  return (
    <div className='app'>Please provide all the info...
    {<Link to={<Home/>}>Home page</Link>}
    </div>
  )
}

export default ErrorPage