import { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'bootstrap';

const Error = ({ handleClose, message }) => {
    const modalRef = useRef()
    
    const showModal = () => {
        const modalEle = modalRef.current
        const bsModal = new Modal(modalEle, {
            backdrop: 'static',
            keyboard: false
        })
        bsModal.show()
    }
    
    const hideModal = () => {
        const modalEle = modalRef.current
        const bsModal= Modal.getInstance(modalEle)
        bsModal.hide()
    }

    useLayoutEffect(() => {
        showModal()
    }, []);
    
    return (
        <div>
            <div className="modal fade" ref={modalRef} tabIndex="-1" role="alertdialog" aria-modal="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Chitter App Info</h5>
                            <button type="button" className="btn-close" onClick={() => { hideModal(); handleClose(); }} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {message}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => { hideModal(); handleClose(); }}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;
