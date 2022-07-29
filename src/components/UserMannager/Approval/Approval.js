import { Image } from 'antd';
import axios from 'axios';
import React from 'react'
import apiConfig, { error, handleDate } from '../../../API/configApi';
import BoxModal from '../../BoxModal/BoxModal';
import '../UpdateMovie/UpdateMovie.css';
import './Approval.css';

function Approval({setShowModal, movieApproval, approval}) {
    console.log(movieApproval);
    const handleApproval = async (approvalValue) => {
        try {
            const data = await axios.post(apiConfig.urlConnect + "movie/approval", {
                movie_id: movieApproval._id,
                approval: approvalValue
            }, apiConfig.headers)
            if(data.status === 200) {
                setShowModal()
                approval(movieApproval._id)
            }
        } catch(e) {
            console.log(e);
            error("Failed, please try again!")
        }
    }
  return (
    <div className='update-movie__container'>
        <BoxModal title={`Approval user: ${movieApproval.user_name} (update: ${handleDate(movieApproval.createdAt)})`} closeModal={setShowModal}>
            <div className="trailer-main">
                <div className='approval__container'>
                    <div className="detail__image approval__image"> 
                        <h3>Poster</h3>
                        <Image src={(apiConfig.urlConnectSocketIO + movieApproval.poster_path)} 
                        effect='black-and-white'
                        alt={movieApproval.name} />
                        <h3>Backdrop</h3>
                        <Image src={(apiConfig.urlConnectSocketIO + movieApproval.backdrop_path)} 
                        effect='black-and-white' className='approval-backdrop'
                        alt={movieApproval.name} />
                        <p className="detail-content__desc">
                            <span className="detail-content__time">Country: {movieApproval.country}</span>
                        </p>
                        {/* <p className="detail-content__desc">
                            <span className="detail-content__time">Total seasons: {movieApproval.number_of_seasons}</span>
                            Total Episode: {movieApproval.number_of_episodes}
                        </p> */}
                        <p className="detail-content__desc">
                            <span className="detail-content__time">Time: {movieApproval.runtime} minute</span>
                        </p>
                        <p className="detail-content__desc">
                            Date: {movieApproval.release_date}
                        </p>
                        { movieApproval.director !== "" && <p className="detail-content__desc">Directors: {movieApproval.director}</p>}
                    </div>
                    <div className="detail-container__wrap approval__wrap">
                        <div className="detail-content">
                            <h2 className="detail-content__title">{movieApproval.name}</h2>
                            <p className="detail-content__desc">{movieApproval.overview}</p>
                            
                            <div className="detail-content__genres">
                            Genres :{movieApproval.genres.map((item, id) => <span key={id}>{item.key || item.name}</span>)}
                            </div>
                            <iframe
                                src={movieApproval.url}
                                frameBorder="0" 
                                className='approval__video'
                                allowFullScreen="allowfullscreen" 
                                title="YouTube video player" >
                            </iframe>
                            <ul className="approval-trailer__list">
                                {movieApproval.trailers.map((item, id) => 
                                <li key={id} className="approval-trailer__item">
                                    {item.title !== "" && <span className='approval-trailer__title'>{item.title}</span>}
                                    {item.url !== "" && <iframe
                                        src={item.url}
                                        frameBorder="0" 
                                        className='approval-trailer__video'
                                        allowFullScreen="allowfullscreen" 
                                        title="YouTube video player" >
                                    </iframe>}
                                </li>)}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='approval__button'>
                    <span className='button green' onClick={()=>handleApproval("1")}>Approval</span>
                    <span className='button red'  onClick={()=>handleApproval("2")}>Refuse</span>
                </div>
            </div>
    </BoxModal>
    </div>
  )
}

export default Approval