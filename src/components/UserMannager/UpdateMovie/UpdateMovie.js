import React from 'react'
import BoxModal from '../../BoxModal/BoxModal'
import './UpdateMovie.css';
import UploadMovie from '../UploadMovie/UploadMovie'

function UpdateMovie({setShowModal, movieDetail}) {
  console.log(movieDetail);
  return (
    <div className='update-movie__container'>
        <BoxModal title={`Movie: ${movieDetail.name}`} closeModal={setShowModal}>
            <div className="trailer-main">
                <UploadMovie movieDetail={movieDetail} closeModal={setShowModal}/>
            </div>
    </BoxModal>
    </div>
  )
}

export default UpdateMovie