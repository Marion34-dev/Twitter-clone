import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ loggedIn, logout }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/" className="navbar-brand">Chitter App</Link>
            <>
              <div className="collapse navbar-collapse">
                <div className="navbar-nav">
                  <NavLink to="/">
                    View Peeps
                  </NavLink>   

                  <NavLink to="/add" className={(({ isActive }) => isActive ? `nav-link active` : `nav-link`)}>
                    Post Peep
                  </NavLink>
                </div>
              </div>
              <a href="/" className="nav-item mr-3 nav-link p-3" onClick={logout}>Log Out</a>
            </>
        </div>
      </nav>
    </header>
  );
};

Header.defaultProps = {
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}

export default Header;