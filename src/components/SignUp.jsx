import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:4000/api/auth/Createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }

            // redirect
            localStorage.setItem('token', data.authtoken)
            navigate('/login')
        }
        catch (error) {
            alert(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name='name' aria-describedby="nameHelp"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    minLength={3}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={5}
                />
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
    )
}

export default SignUp
