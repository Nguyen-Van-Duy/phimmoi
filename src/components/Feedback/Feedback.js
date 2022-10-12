import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

import { listTrailer } from '../../API/MoviesApi';
import BoxModal from '../BoxModal/BoxModal';
import '../Trailer/Trailer.css';
import './Feedback.css';
const { TextArea } = Input;

const Feedback = ({closeFeedback}) => {

    const closeMovieTrailer = () => {
        closeFeedback()
    }

    const onChangeFeedback = (e) => {
        console.log(e);
    }

     const onChangeEmail = (e) => {
        console.log(e);
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
                <Input placeholder="input with clear icon" allowClear onChange={onChangeEmail} />
                <br />
                <br />
                <TextArea placeholder="textarea with clear icon" allowClear onChange={onChangeFeedback} />
                <div className="bw"><span className='button blue paticipant-button'>Send</span></div>
            </div>
        </BoxModal>
    );
};

export default Feedback;