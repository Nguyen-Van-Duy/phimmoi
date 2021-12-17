import React from 'react';
import './Arrow.css';

const NextArrow = ({onClick}) => {
    return (
        <div className="banner__arrow next-arrow" onClick={onClick}>
            <i className="fas fa-angle-right"></i>
        </div>
    );
};

export default NextArrow;