import React from 'react';
import './MovieItem.css';
import "./MovieList.css";
import apiConfig from '../../API/configApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { useSelector } from 'react-redux';

const MovieItem = ({item, category, userId, handleRemove, myMovie, setShowModal}) => {
    const location = useLocation()
    // const dataUser = useSelector(state=>state.loginSlice.dataUser)
    const navigate = useNavigate()
    const handleNotification = () =>{
        if(category === 'person') {
            alert('this is not a movie!')
        }
    }
    return (
        <div className="movie-item">
            <div className="movie-item__content">
                <Link onClick={handleNotification} to={category !== 'person' ? `/${category}/${item.id || item._id}` : '#'} className="movie-item__link">
                    {!item.user_id && <LazyLoadImage 
                        className="movie-item__image" 
                        src={`${item.poster_path || 
                            item.backdrop_path ? apiConfig.w200Image(item.poster_path || item.backdrop_path
                        ) : apiConfig.backupPhoto}` } 
                        effect='black-and-white'
                        alt={item.title || item.name} height="150%" width="100%" loading="lazy" />
                    }

                    {item.user_id && <LazyLoadImage 
                        className="movie-item__image" 
                        src={apiConfig.urlConnectSocketIO + item.poster_path} 
                        effect='black-and-white'
                        alt={item.title || item.name} height="150%" width="100%" loading="lazy" />
                    }

                    <div className="movie-item__desc">
                        <span className="movie-item__name">{item.title || item.name}</span>
                        {/* <p className="movie-item__date">Note that the</p> */}
                    </div>
                    <div className="movie-item__quanlity">HD</div>
                    <div className="movie-item__cent">{item.vote_average?.toFixed(1) || 10}</div>
                </Link>
                {userId && <div className="update-movie">
                    <div className='update-movie__wrap' onClick={()=>{
                        if(location.pathname !== "/manager/movie-waiting") {
                            navigate(`/${category}/${item.id || item._id}`)
                        }
                    }}></div>
                    <div className='update-movie__button'>
                        {(!handleRemove || myMovie) && location.pathname !== "/manager/movie-waiting" && <span  className="blue" onClick={setShowModal} ><i className="fa-solid fa-pen-to-square button-icon"></i> Update</span>}
                        {handleRemove && <span className="red" onClick={handleRemove}><i className="fa-solid fa-trash-can button-icon"></i>Delete</span>}
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default MovieItem;

