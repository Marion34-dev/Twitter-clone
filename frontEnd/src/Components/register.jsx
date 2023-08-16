import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegistrationForm = () => {
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        username: '',
        password: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, username, password } = newUser;

        if (name && email && username && password) {
            try {
                // const res = await axios.post('http://localhost:3000/register', newUser);
                const res = await axios.post(`http://${import.meta.env.VITE_PEEPSURL}/register`, newUser);

                setNewUser({
                    name: '',
                    email: '',
                    username: '',
                    password: '',
                });

                setSubmitted(res.data.message === 'success' ? true : res.data.message);
                window.alert("Successfully registered! You can now log in");

            } catch (error) {
                console.log(error)
            }
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    };

    if (submitted === "user exists") {
        return (
            <>
                <h2>{submitted}</h2>
                <p> You already have an account! <Link to="/login"><br /> Log in </Link></p>
            </>
        );
    }

    return (
        <>
            <h1> Create your account</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={newUser.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={newUser.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={newUser.password}
                        onChange={handleChange}
                    />
                </div>
                <button id="register-button" type="submit">Register</button>
            </form>
            <br></br>
            <p> Already have an account? <Link to="/login"> Login! </Link></p>
        </>
    );
}

export default RegistrationForm;
