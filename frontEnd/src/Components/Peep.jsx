import PropTypes from 'prop-types';

const Peep = ({ body }) => {
    const { peepCreatedBy, username, peepDateCreated, peepMessage } = body;

    // Function to format the date as DD/MMM/YYYY
    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

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
