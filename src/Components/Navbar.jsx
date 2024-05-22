import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import mylogo from '../Assets/images/wizinoa.png'

export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <Link to={'/'}>
                        <img src={mylogo} />
                    </Link>
                </div>
                <div className='nav-links'>
                    <Link to={'/'}>Description</Link>
                </div>
                <div className="nav-links">
                    <Link to={'/table'}>TABLE</Link>
                    <Link to={'/crud'}>CRUD</Link>
                </div>
            </nav>
            <Outlet />
        </>
    )
}
