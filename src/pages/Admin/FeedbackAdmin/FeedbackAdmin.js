import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import apiConfig, { success } from '../../../API/configApi';
import './FeedbackAdmin.css'

const FeedbackAdmin = () => {
    const [feedback, setFeedback] = useState()
    useEffect(()=>{
        const fetchDataFeedback = async () => {
            const data = await axios.get(apiConfig.urlConnect + "feedback")
            console.log(data);
            if(data.status === 200) {
                setFeedback(data.data)
            }
            // setTotalResults(data.total_results)
            // setTotalPage(data.total_pages)
            // setDataSchedule(data.data)
        }
        fetchDataFeedback()
    }, [])

    const handleDelete = async (id) => {
        console.log(id);
        const resultDelete = await axios.delete(apiConfig.urlConnect + "feedback/delete/" + id)
        console.log(resultDelete.data);
        if(resultDelete.status === 200) {
            const newData = feedback.filter(item=>item._id !== id)
            setFeedback(newData)
            success("Delete successfully!")
        }
      }

    const handleDate = (time) => {
        const date = new Date(time)
        const day = time.slice(0, 10)
        const h = date.getHours()
        const m = date.getMinutes()
        const s = date.getSeconds()
        return day + ' ' + h + ":" + m + ":" + s
    }
    return (
        <div>
            <ul>
                {feedback && feedback.length > 0 && feedback.map((item, id) => 
                <li key={id} className="feedback-admin">
                    <h3>{item.email}</h3>
                    <div>{handleDate(item.createdAt)}</div>
                    <span>{item.message}</span>
                    <span className="delete-feedback"><i className="fa-regular fa-circle-xmark" onClick={()=>handleDelete(item._id)}></i></span>
                </li>)}
            </ul>
        </div>
    );
};

export default FeedbackAdmin;