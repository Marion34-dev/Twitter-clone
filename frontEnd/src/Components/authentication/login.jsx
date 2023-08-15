import { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = ({ user: { loginUser, setLoginUser } }) => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const login = async (e) => {
        e.preventDefault();

        // const res = await axios.post('http://localhost:3000/login/', user);
        const res = await axios.post(`http://${import.meta.env.VITE_PEEPSURL}/login`, user);

        alert(res.data.message);

        setUser({ email: '', password: '' });
        setLoginUser(res.data.user);
    };

    return (
        <>
            {loginUser && <Navigate to="/" />}
            <h1> Log in your account</h1>
            <form onSubmit={login}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email: </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password: </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div> 
                <button id="login" type="submit">Login</button> 
            </form>
            <br />
            <Link to="/register">
                <p>Or register now!</p>
            </Link>
        </>
    );
};

Login.propTypes = {
    user: PropTypes.shape({
        loginUser: PropTypes.object,
        setLoginUser: PropTypes.object
    })
};

export default Login;
