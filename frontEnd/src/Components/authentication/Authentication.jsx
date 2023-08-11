import PropTypes from 'prop-types';
import LogInForm from './LogInForm';

const Authentication = ({ handleLogin }) => {
  return (
      <div className="row">
            <div className="col-lg-6 offset-3">
              <h3>Login</h3>
              <p>You'd like to post a peep? Log in!</p>
                <LogInForm handleLogin={handleLogin} />          
            </div>
        </div>
    )
}

Authentication.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool
}

export default Authentication;