import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
    const isUserSignedIn = !!localStorage.getItem('token')
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
        window.location.reload()

    }
    return (
        <div>
            <nav className='main-nav'>
                <div className='navbar'>
                    <div className='nav-logo'>
                        <Link className='link' to='/'>AuthDB</Link>
                    </div>
                    <div className='links'>
                        <ul>
                            {
                                isUserSignedIn ?
                                    (
                                        <>
                                            <li><Link className='link' to='/account'>Account</Link></li>
                                            <li><Link className='link' onClick={handleSignOut}>LogOut</Link></li>
                                            
                                            </>
                                    )
                                    :
                                    (
                                        <>
                                            <li><Link className='link' to='/signup'>SignUp</Link></li>
                                            <li><Link className='link' to='/login'>Login</Link></li></>

                                    )
                            }

                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar