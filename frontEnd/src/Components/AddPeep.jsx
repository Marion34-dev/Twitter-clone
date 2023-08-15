
import { useState } from "react"
import PropTypes from "prop-types";
import axios from 'axios';
import PeepModel from "./utils/Peep.model.js";

const AddPeep = ({ user: { name, username } }) => {
    const [newAddPeep, setNewAddPeep] = useState('');
    const [addPeepMessage, setAddPeepMessage] = useState('');

    const makeNewPeep = async (e) => {
        e.preventDefault();
        const peepDateCreated = new Date().toISOString();

        const newPeep = new PeepModel(newAddPeep, peepDateCreated, name, username)
        console.log(newPeep)
        if (Object.keys(newPeep).length) {
            try {
                // const res = await axios.post('http://localhost:3000/add', newPeep)
                const res = await axios.post(`http://${import.meta.env.VITE_PEEPSURL}/add`, newPeep);

                setAddPeepMessage(res.data.message);
                setNewAddPeep('');
                window.alert("Your peep has been posted!");


            } catch (error) {
                setAddPeepMessage('Request unsuccessful, please try again')
            }
        }
    }

    return (
            <div id="postComponent">
                <div>
                    <h1> Time to post! </h1>
                    <h2 className="name">From: {name} ✅</h2>
                    <h3 className="username">{username}</h3>
                    <form onSubmit={makeNewPeep}>
                    <textarea className="largerTextarea"
                            onChange={e => setNewAddPeep(e.target.value)}
                            placeholder="Enter your peep here..."
                            value={newAddPeep} ></textarea>
                        
                        {addPeepMessage && <small>{addPeepMessage}</small>}
                        <br />
                            <button id="newPeep-button" type="submit"> Publish! </button>
                    </form>
                </div>
            </div>
    )
}

AddPeep.propTypes = {
    user: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            peepCreatedBy: PropTypes.string,
            username: PropTypes.string
        })
    ])
}

export default AddPeep;