import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PeepModel from './utils/Peep.model';

const Peep = ({ peep }) => {
    const { peepMessage, peepDateCreated, peepCreatedBy, _id} = peep;
    const dateCreated = new Date(peepDateCreated).toUTCString();

    return (
        <tr>
            <td>{peepMessage}</td>
            <td>{dateCreated}</td>
            <td>{peepCreatedBy}</td>
        </tr>
    );
};

Peep.propTypes = {
    peep: PropTypes.instanceOf(PeepModel),
}

export default Peep;