import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DateCreated from './utils/DateCreated';

const PeepWrapper = ({ submitAction, peep }) => {

    const editPeep = peep && Object.keys(peep).length !== 0 && Object.getPrototypeOf(peep) === Object.prototype;

    const [peepMessage, setPeepMessage] = useState(``);
    const [peepDateCreated, setPeepDateCreated] = useState(null);
    const [peepCreatedBy, setPeepCreatedBy] = useState(``);

    useEffect(() => {
        if (editPeep) {
            setPeepMessage(peep.peepMessage);
            setPeepDateCreated(peep.peepDateCreated);
            setPeepCreatedBy(peep.peepCreatedBy);
        }
    }, [editPeep, peep.peepCreatedBy, peep.peepDateCreated, peep.peepMessage]);

    const handleSubmit = event => {
        event.preventDefault();
        submitAction(peepMessage, peepDateCreated, peepCreatedBy, peep?._id);
        setPeepMessage(``);
        setPeepDateCreated(null);
        setPeepCreatedBy(``);
    }

    return (
        <form aria-label="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="peepMessage">Message:&nbsp;</label>
                <input
                    type="text"
                    name="peepMessage"
                    placeholder="Peep Message"
                    className="form-control"
                    value={peepMessage}
                    onChange={event => setPeepMessage(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label title="peepDateCreated">Created on:&nbsp;
                    {editPeep && `${new Date(peep.peepDateCreated).toLocaleDateString()} @ ${new Date(peep.peepDateCreated).toLocaleTimeString()}`}
                    {!editPeep && <DateCreated updateDateCreated={dateCreated => setPeepDateCreated(dateCreated)} />}
                </label>
            </div>
            <div className="form-group" hidden={!editPeep}>
                <label htmlFor="peepCreatedBy">Created by:&nbsp;</label>
                <input
                    type="text"
                    name="peepCreatedBy"
                    placeholder="Peep Created By"
                    value={peepCreatedBy}
                    onChange={event => setPeepCreatedBy(event.target.value)}
                />
            </div>
            <div className="form-group">
                <input type="submit" value="Submit" className={`btn ${!peepMessage ? `btn-danger` : `btn-primary`}`} disabled={!peepMessage} />
            </div>
        </form>
    );
};

PeepWrapper.propTypes = {
    submitAction: PropTypes.func.isRequired,
    peep: PropTypes.shape({
        peepDescription: PropTypes.string,
        peepDateCreated: PropTypes.string,
        peepCreatedBy: PropTypes.string,
        _id: PropTypes.string
    })
}

export default PeepWrapper;