import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav>
        <ul>
            <li>
                <Link to="/">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/collection">Collection</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navigation;