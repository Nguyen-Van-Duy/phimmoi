import { Result } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import apiConfig, { error, success } from '../../../API/configApi';
import Loading from '../../Loading';
import Modal from '../../Modal/Modal';
import MovieItem from '../../MovieList/MovieItem';
import UpdateMovie from '../UpdateMovie/UpdateMovie';
import "./MyMovie.css"
import { SmileOutlined } from '@ant-design/icons';

const MyMovie = () => {
    const [movie, setMovie] = useState(null)
    const [movieDetail, setMovieDetail] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [isLoading, setIsloading] = useState(true)
    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    console.log(dataUser);
    useEffect(() => {
        const fetchMovieUpload = async () => {
            const data = await axios.get(apiConfig.urlConnect + "movie/my-movie/" + dataUser._id)
            console.log(data);
            setMovie([...data.data,...data.data])
            setIsloading(false)
        }
        if(dataUser._id) {
            fetchMovieUpload()
        }
    }, [dataUser._id])

    const handleRemove = async (movieId) => {
        if(dataUser && dataUser._id) {
            const result = await axios.delete(apiConfig.urlConnect + 'movie/delete-my-movie/' + movieId, apiConfig.headers)
            console.log(result);
            if(result.status === 200) {
                const newListMovie = movie.filter(item=> item._id !== movieId)
                setMovie(newListMovie)
                success("Delete successfully!")
            } else {
                error("404!")
            }
        } else {
            error("You need to be logged in to perform this function!")
        }
    }

    const handleShowMovieUpdate = (movieDefault) => {
        setMovieDetail(movieDefault)
        setShowModal(!showModal)
    }
    console.log(movie);
    return (
    <>
        <h2 className='profile_title'>My Movies</h2>
        <div onClick={()=>setShowModal(!showModal)}><Modal showModal={showModal} /></div>
        {showModal && movieDetail && <UpdateMovie setShowModal={()=>setShowModal(!showModal)} movieDetail={movieDetail} />}
        <div className="my-movie__container">
        {isLoading && <div className="manager-loading loading"><Loading /></div>}
            {!isLoading && movie && movie.length > 0 && movie.map((item, index) => <div className="view-more__item" key={index} >
                <MovieItem item={item} 
                category={item.media_type} 
                userId={dataUser._id} 
                handleRemove={()=> handleRemove(item._id)} 
                myMovie={item.user_id === dataUser._id} 
                setShowModal={()=>handleShowMovieUpdate(item)} />
            </div>)}
            
        </div>
        {!isLoading && movie.length <= 0 && <Result
                    icon={<SmileOutlined />}
                    title="No Data!"
                />}
    </>
    );
};

export default MyMovie;