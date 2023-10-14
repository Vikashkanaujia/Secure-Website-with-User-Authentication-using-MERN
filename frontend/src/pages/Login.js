import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        axios.get('http://localhost:5000/register')
            .then((res) => {
                console.log(res.data);
            })
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/login', {
            email, password
        })
        console.log(response.data);
        const token = response.data.user;
        alert('Login Successful')
        localStorage.setItem('token', token)
        setEmail('')
        setPassword('')
        navigate('/account')
        window.location.reload()

    }

    return (
        <div className='login-main'>

            <div className='login-left'>
                <div className='form-section'>
                    <div className='form'>
                        <form onSubmit={handleLogin}>
                            <label>Email : </label><br />
                            <input type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter your email' />
                            <br />
                            <label>password : </label><br />
                            <input type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter your password' />
                            <br />
                            <div className='btn'>
                                <button type='submit'>Login</button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
            <div className='login-right'>
                <div className='login'>
                    <h2>Login</h2>
                </div>

            </div>

        </div>
    )
}

export default Login