import PropTypes from 'prop-types';
import Dashboard from './Dashboard.jsx';

const RoutedMain = () => {
    return (
        <>
            <h1> Welcome to Chitter! </h1>
                    <Dashboard />
        </>
    );
};

RoutedMain.propTypes = {
    loginUser: PropTypes.object 
};

export default RoutedMain;