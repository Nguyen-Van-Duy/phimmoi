import React, { useEffect, useState } from 'react';
import { listTrailer } from '../../API/MoviesApi';
import BoxModal from '../BoxModal/BoxModal';
import '../Trailer/Trailer.css';
import './Feedback.css';

const Feedback = ({closeTrailer}) => {

    const closeMovieTrailer = () => {
        closeTrailer()
    }

    useEffect(() => {
        // const fetchDataTrailer = async () => {
        //     const data = await listTrailer(category, id);
        //     setDataTrailer(data.results)
        // }
        // fetchDataTrailer()
    }, [])
    return (
        <BoxModal title="Feedback" closeModal={closeMovieTrailer}>
            <div className="feedback-main">
                <input type="text" placeholder="Email" />
                <textarea placeholder="content"></textarea>
            </div>
        </BoxModal>
    );
};

export default Feedback;