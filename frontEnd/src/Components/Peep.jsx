import PropTypes from 'prop-types';
import formatDate from '../Components/utils/peepDateCreated';

const Peep = ({ body }) => {
    const { peepCreatedBy, username, peepDateCreated, peepMessage } = body;
    const formattedDate = formatDate(peepDateCreated);

    return (
        <div className="card">
            <div className="container">
                {body ? (
                    <>
                        <h4 className='PeepName'>{peepCreatedBy}</h4>
                        <h6 className='username'>{username}</h6>
                        <h6>{formattedDate}</h6>
                        <h2>{peepMessage}</h2>
                    </>
                ) : (
                    <p>Sorry, there are no peeps available. How about posting one now?</p>
                )}
            </div>
        </div>
    );
}

Peep.propTypes = {
    body: PropTypes.shape({
        _id: PropTypes.string,
        peepCreatedBy: PropTypes.string,
        username: PropTypes.string,
        peepDateCreated: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Date),
        ]),
        peepMessage: PropTypes.string,
    }),
};

export default Peep;
