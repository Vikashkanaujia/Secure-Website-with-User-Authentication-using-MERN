import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const navigate = useNavigate();
    const [user ,setUser] = useState([])
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        fetchUsers();
    },[])

    const fetchUsers = () =>{
        axios.get('http://localhost:5000/register')
        .then((res)=>{
            console.log(res.data);
        })
    }
    const handleSignup = async(e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/register',{
            name,email,password
        })
        .then(()=>{
            alert('Registration Successful')
            setName('')
            setEmail('')
            setPassword('')
            fetchUsers()
            navigate('/login')
        })

        
    }
    return (
        <div className='signup-main'>
            <div className='signup-left'>
                <div className='form-section'>
                <div className='form'>
                    <form onSubmit={handleSignup}>

                        <label>Name : </label><br />
                        <input type='text' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter your password' />
                        <br />
                        <label>Email : </label><br />
                        <input type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter your email' />
                        <br />

                        <label>password : </label><br />
                        <input type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter your password' />
                        <br />
                        <div className='btn'>
                        <button type='submit'>SignUp</button>
                        </div>
                        
                    </form>
                    </div>
                </div>
            </div>
            <div className='signup-right'>
                <div className='signup'>
                    <h2>SignUp</h2>
                </div>

            </div>
        </div>
    )
}

export default SignUp