import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';

import PeepWrapper from './PeepWrapper';
import PeepModel from './utils/Peep.model';
import Modal from './utils/Error';

const AddPeep = ({ submitAction, data }) => {

    const [peep, setPeep] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();
    const { _id } = useParams();

    useEffect(() => {
        if (!_id) return setPeep({});
        const peepToEdit = data?.find(currentPeep => currentPeep._id === _id);
        if (peepToEdit) return setPeep(peepToEdit);
        setPeep({ error: `Peep could not be found` });
    }, [_id, data]);

    useEffect(() => {
        if (submitted) navigate("/");
    }, [submitted, navigate]);

    const submitPeep = (peepMessage, peepDateCreated, peepCreatedBy, username) => {
        const peepToSubmit = new PeepModel(peepMessage, new Date(peepDateCreated).toISOString(), peepCreatedBy, username, _id);
        submitAction(peepToSubmit);
        setSubmitted(true);
        console.log("Peep posted)")
    }

    return (
        <>
            {peep?.error && <Modal handleClose={() => setPeep({})} message={peep.error} />}
            <div className="addPeep row">
                <h3>{_id ? `Edit` : `Add`}&nbsp;Peep</h3>
            </div>
            <PeepWrapper submitAction={submitPeep} peep={peep?.error ? {} : peep} />
        </>
    );
}

AddPeep.propTypes = {
    submitAction: PropTypes.func.isRequired,
    peeps: PropTypes.arrayOf(
        PropTypes.exact({
            _id: PropTypes.string,
            peepMessage: PropTypes.string,
            peepDateCreated: PropTypes.string,
            peepCreatedBy: PropTypes.string,
            username: PropTypes.string
        })
    )
}

export default AddPeep;