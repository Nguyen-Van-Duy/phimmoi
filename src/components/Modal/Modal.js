import React from 'react';
import './Modal.css';

const Modal = ({showModal}) => {
    return (
        <div className={`modal ${showModal && "show-modal"}`}>
        </div>
    );
};

export default Modal;