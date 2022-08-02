import { Result } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import apiConfig, { error, success } from '../../../API/configApi';
import MovieItem from '../../MovieList/MovieItem';
import { SmileOutlined } from '@ant-design/icons';
import Loading from '../../Loading';

const MovieWaiting = () => {
    const [movie, setMovie] = useState(null)
    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchMovieUpload = async () => {
            const data = await axios.get(apiConfig.urlConnect + "movie/movie-waiting/" + dataUser._id)
            console.log(data);
            setMovie(data.data)
            setIsLoading(false)
        }
        fetchMovieUpload()
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
    return (<>
            <h2 className='profile_title'>Waiting Approval</h2>
            {isLoading && <div className="manager-loading loading"><Loading /></div>}
            {!isLoading && <div className="my-movie__container">
                {movie &&movie.length > 0 && movie.map((item, index) => <div className="view-more__item" key={index} >
                <MovieItem item={item} category={item.media_type} userId={dataUser._id} handleRemove={()=> handleRemove(item._id)} myMovie={item.user_id === dataUser._id} />
                </div>)} 
            </div>}
            {!isLoading && movie.length <= 0 && <Result
                    icon={<SmileOutlined />}
                    title="No Data!"
                />}
        </>
    );
};

export default MovieWaiting;