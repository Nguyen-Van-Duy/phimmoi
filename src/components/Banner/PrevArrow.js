import React from 'react';
import './Arrow.css';

const PrevArrow = ({onClick}) => {
    return (
        <div className="banner__arrow prev-arrows" onClick={onClick}>
            <i className="fas fa-angle-left"></i>
        </div>
    );
};

export default PrevArrow;