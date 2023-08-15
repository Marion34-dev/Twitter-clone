import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Header = ({ user: { loginUser, setLoginUser } }) => {

    const logOut = () => {
        setLoginUser(null)
    }

    return (
        <> 
            <nav>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid"> 
                        <h2 style={{ color: 'white' }}> Chitter App </h2>
                                {!loginUser && <Link className="navbar-brand" to="/"> Home </Link>}

                                {loginUser && <Link className="navbar-brand" to="/"> Home </Link>}

                                {!loginUser && <Link className="navbar-brand" to="/register"> Register </Link>}

                                {!loginUser && <Link className="navbar-brand" to="/login"> Log in </Link>}

                                {loginUser && <Link className="navbar-brand" to="/" onClick={logOut}> Log out </Link>}

                                {loginUser && <Link className="navbar-brand" to={`/add/${loginUser._id}`}> Post a Peep </Link>} 
                    </div>
                </nav>
            </nav>
        </>
    )
}

Header.propTypes = {
    user: PropTypes.exact({
        loginUser: PropTypes.object,
        setLoginUser: PropTypes.func
    })
}

export default Header;