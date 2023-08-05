import { useEffect, useState } from 'react';

const emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

const LogInForm = ({handleLogin}) => {

    const [login, setLogin] = useState({
        email: {
            value: ``,
            dirty: false,
            validity: false
        },
        password: {
            value: ``,
            dirty: false
        }
    });

    const handleChange = e => {
        const { name, value } = e.target
        setLogin({ ...login, [name]: { ...login[name], value, dirty: true } });
    };

    const makeDirty = e => {
        const { name } = e.target;
        setLogin({ ...login, [name]: { ...login[name], dirty: true } });
    };

    const validate = () => {
        const validity = emailRegEx.test(login.email.value)
        setLogin({
            ...login,
            email: {
                ...login.email,
                dirty: true,
                validity
            }
        });
    };

    const loginSubmitHandler = e => {
        e.preventDefault();
        handleLogin({ email: login.email.value, password: login.password.value });
    }


    return (
        <form aria-label="form" onSubmit={loginSubmitHandler} noValidate>
            <div className="form-group">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                    className="form-control"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@email.com"
                    value={login.email.value}
                    onChange={handleChange}
                    onBlur={validate}
                />
                {login.email.dirty && !login.email.validity && (
                    <div className="text-danger">
                        Please enter a valid email address
                    </div>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                    className="form-control"
                    type="password"
                    name="password"
                    id="password"
                    value={login.password.value}
                    onChange={handleChange}
                    onBlur={makeDirty}
                />
                {login.password.dirty && !login.password.value && (
                    <div className="text-danger">
                        Please enter your password
                    </div>
                )}
            </div>
            <br />
            <input type="submit" className="btn btn-primary" disabled={!(login.email.validity && login.password.value)} value="Log In" />
        </form>
    );
};

export default LogInForm;