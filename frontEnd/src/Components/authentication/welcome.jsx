import PropTypes from 'prop-types';

const Welcome = ({ setLoginUser, user }) => (
    <>
        <h1>Welcome {user.name}</h1>
        <button onClick={() => setLoginUser({})}>Log out</button>
    </>
);

Welcome.propTypes = {
    setLoginUser: PropTypes.func,
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string
    })
};

export default Welcome;
