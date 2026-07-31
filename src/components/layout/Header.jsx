import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='nav'>
            <h1>SRIT99: React-Query</h1>
            <div>
                <Link to='/'>Home</Link>
                <Link to='/old'>Fetch Old</Link>
                <Link to='/polling'>Polling rq</Link>
                <Link to='/rc'>Fetch Rq</Link>
                <Link to='/rq'>Fetch comments</Link>

            </div>
        </div>
    )
}

export default Header