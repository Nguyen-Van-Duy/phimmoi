import React, {useRef } from 'react';
import { Input } from 'antd';

import BoxModal from '../BoxModal/BoxModal';
import '../Trailer/Trailer.css';
import './Feedback.css';
import apiConfig, { success } from '../../API/configApi';
import axios from 'axios';
const { TextArea } = Input;

const Feedback = ({closeFeedback}) => {
    const emailRef = useRef()
    const messageRef = useRef()

    const closeMovieTrailer = () => {
        closeFeedback()
    }

    const handleSendMessage = async () => {
        const email = emailRef.current.input.value;
        const message = messageRef.current.resizableTextArea.textArea.value;
        try {
            const data = await axios.post(apiConfig.urlConnect + "feedback/add-feedback", {
              email,
              message, 
            });
            console.log(data);
            emailRef.current.input.value = ""
            messageRef.current.resizableTextArea.textArea.value = ""
            success("Approved success!")
          } catch (error) {
            console.log(error);
            error("Failed, please try again!")
          }
    }
    return (
        <BoxModal title="Feedback" closeModal={closeMovieTrailer}>
            <div className="feedback-main">
                <Input placeholder="Enter your email" ref={emailRef} allowClear />
                <br />
                <br />
                <TextArea placeholder="Enter your feedback" ref={messageRef} allowClear />
                <div className="bw"><span className='button blue paticipant-button' onClick={handleSendMessage}>Send</span></div>
            </div>
        </BoxModal>
    );
};

export default Feedback;