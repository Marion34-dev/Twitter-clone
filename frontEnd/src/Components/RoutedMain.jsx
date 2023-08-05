import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import AllPeeps from './AllPeeps';
import AddPeep from './AddPeep';
import Error from './utils/Error';
import NotFound from './utils/NotFound';

import { getPeeps, submitPeep, updatePeep } from '../asyncFunctions/APICalls';

const RoutedMain = () => {
    
    const [peeps, setPeeps] = useState([]); // Initialise array of peeps
    const [error, setError] = useState({ type: ``, message: ``, modalShown: false })
    const [createUpdateStatus, setCreateUpdateStatus] = useState(``);

    const getPeepsHandler = async () => {
        const externalDataCallResult = await getPeeps();
        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error, modalShown: false };
            errorObject.message = `There was a problem getting the peeps: ${externalDataCallResult.error.message}`;
            setError(errorObject);
        }
        const peeps = externalDataCallResult?.peeps ? externalDataCallResult.peeps : [];
        setPeeps(peeps);
    };

    useEffect(() => {
        getPeepsHandler();
    }, []);

    const handleModalClose = () => {
        setError({ ...error, modalShown: true });
    };

    const createUpdateStatusHandler = () => {
        setCreateUpdateStatus(``);
    };

    const submitPeepHandler = async peep => {
        const externalDataCallResult = await submitPeep(peep);
        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error, modalShown: false };
            errorObject.message = `There was a problem posting the peep: ${externalDataCallResult.error.message}`;
            return setError(errorObject);
        }
        setCreateUpdateStatus(`Your peep has been posted!`);
        getPeepsHandler();
    };
    
    const updatePeepHandler = async peep => {
        const externalDataCallResult = await updatePeep(peep);
        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error, modalShown: false };
            errorObject.message = `There was a problem updating the peep: ${externalDataCallResult.error.message}`;
            return setError(errorObject);
        }
        setCreateUpdateStatus(`Todo Updated`);
        getPeepsHandler();
    };

    return (
        <>
            {error.type && !error.modalShown && <Error handleClose={handleModalClose} message={error.message} />}
            {createUpdateStatus && <Error handleClose={createUpdateStatusHandler} message={createUpdateStatus} />}

            <React.StrictMode>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<AllPeeps data={{ peeps, error: error.message }} />} />
                        <Route path="/add" element={<AddPeep submitAction={submitPeepHandler} />} />
                        <Route path="/edit/:_id" element={<AddPeep submitAction={updatePeepHandler} data={peeps} />} />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </div>
            </React.StrictMode>
        </>
    );
};

export default RoutedMain;