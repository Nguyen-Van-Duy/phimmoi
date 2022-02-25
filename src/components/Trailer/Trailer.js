import React, { useEffect, useState } from 'react';
import { listTrailer } from '../../API/MoviesApi';
import BoxModal from '../BoxModal/BoxModal';
import './Trailer.css';

const Trailer = ({closeTrailer, category, id}) => {

    const [dataTrailer, setDataTrailer] = useState([])

    const closeMovieTrailer = () => {
        closeTrailer()
    }

    useEffect(() => {
        const fetchDataTrailer = async () => {
            const data = await listTrailer(category, id);
            console.log(data.results);
            setDataTrailer(data.results)
        }
        fetchDataTrailer()
    }, [category, id])
    return (
        <BoxModal title="Movies Trailer" closeModal={closeMovieTrailer}>
            <div className="trailer-main">
                {dataTrailer.length > 0 ? dataTrailer.map((item, id) => <div key={id} className="trailer-item">
                    <span className="trailer-item__title">{item.name}</span>
                    <iframe
                    src={`https://www.youtube.com/embed/${item.key}`}
                    frameBorder="0" 
                    allowFullScreen="allowfullscreen" 
                    title="YouTube video player" />
                </div>) : 'There are currently no videos!'}
            </div>
        </BoxModal>
    );
};

export default Trailer;