import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Peep from './Peep';
import PeepModel from './utils/Peep.model';

const AllPeeps = ({ data }) => {

    const [dataStatus, setDataStatus] = useState({ name: `loading`, message: `Data is loading...` });

    useEffect(() => {
        const { error } = data;
        if (error?.length) {
            return setDataStatus({ name: `error`, message: error });
        }

        setDataStatus({ name: `loading`, message: `Data is loading...` });
    }, [data]);


    const populateTable = () => {
        const { peeps } = data;
        if (peeps?.length > 0) {
            const displayPeeps = peeps.map(currentPeep => {
                const peep = new PeepModel(currentPeep.peepMessage, currentPeep.peepDateCreated, currentPeep.peepCreatedBy, currentPeep.username, currentPeep._id);
                return <Peep peep={peep} key={peep._id}  />
            });
            return displayPeeps;
        }

        return (
            <tr><td id={dataStatus.name} colSpan="3">{dataStatus.message}</td></tr>
        );
    }

    return (
        <div className="row">
            <h3>A view of all the peeps</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Message</th>
                        <th>Date Created</th>
                        <th>Created By</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>{populateTable()}</tbody>
            </table>
        </div>
    );
};
    AllPeeps.propTypes = {
        data: PropTypes.oneOfType([
            PropTypes.exact({
                peeps: PropTypes.arrayOf(
                    PropTypes.shape({
                        _id: PropTypes.string,
                        peepMessage: PropTypes.string,
                        peepDateCreated: PropTypes.string,
                        peepCreatedBy: PropTypes.string,
                        username: PropTypes.string
                    })
                ),
                error: PropTypes.string
            }),
        ])
    };


export default AllPeeps;