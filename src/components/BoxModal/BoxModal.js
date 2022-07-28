import React from 'react';

const BoxModal = ({children, closeModal, title}) => {
    return (
        <div className="trailer-container container__conainer">
            <div className="trailer-content">
                <div className="trailer-head">
                    <h2 className="trailer-head__title">{title}</h2>
                    <div className="trailer-head__close" onClick={() => closeModal()}>
                        <i className="fa-regular fa-circle-xmark"></i>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default BoxModal;